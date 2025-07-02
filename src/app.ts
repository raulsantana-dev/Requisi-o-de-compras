import path from 'path';
import moment from 'moment';
import { Iexcel } from './types/Iexcel';
import { diaPasta, mesPasta, sleep, getWindowsUser } from './utils/helpers';
import { montarDadosPrimarios, montarDadosSecundarios } from './utils/transformadores';
import { readExcel, getFilesInFolder, renameFile, saveBlankFile, ReadTxt } from './services/processamentoService';
import { initTransacao, inserindoItens, inserindoAnexos, executarVBS, loginSAP } from './services/sapService';
import { insertLog, ultimoID } from './database/snowflake';
import XLSX from 'xlsx';

export async function reqCompras(paths: {
  executar: string;
  andamento: string;
  finalizados: string;
  anexo: string;
}) {
  const mes = await mesPasta();
  const dia = await diaPasta();
  const username = getWindowsUser();
  const dataArquivo = moment().format('DDMMYYYY_HHmmss');

  const arquivos = await getFilesInFolder(paths.executar, 'xlsx');
  if (arquivos.length === 0) {
    console.log('Nenhum arquivo encontrado para execução');
    return;
  }

  for (const arquivo of arquivos) {
    const dInicioRPA = moment().format('DD/MM/YYYY HH:mm:ss');
    let idAtual: number;
    let nameFile: string;

    if (path.basename(arquivo).includes('ID_')) {
      nameFile = path.basename(arquivo);
      await renameFile(arquivo, `${paths.andamento}/${nameFile}`);
      idAtual = Number(nameFile.split('_')[1]);
    } else {
      const id = await ultimoID();
      idAtual = parseInt(id['MAX(TO_NUMBER(ID_EXECUTE))']) + 1;
      nameFile = `ID_${idAtual}_${dataArquivo}_${path.basename(arquivo)}`;
      await renameFile(arquivo, `${paths.andamento}/${nameFile}`);
    }

    const workbook = readExcel(`${paths.andamento}/${nameFile}`);
    const worksheet = workbook.Sheets['Planilha1'];
    const xlsxData: Iexcel[] = XLSX.utils.sheet_to_json(worksheet);

    const codigoTransacao = xlsxData[0]['Codigo Transacao'];
    const nomeArquivo = xlsxData[0]['Nome Arquivo'];
    const descricao = xlsxData[0]['Descricao'];
    const area = xlsxData[0]['Area de Execução'];

    const executandoPath = `C:/Users/${username}/Desktop/RPA_ReqCompras/executando.txt`;
    const executando = await getFilesInFolder(`C:/Users/${username}/Desktop/RPA_ReqCompras`, 'executando.txt');
    if (executando.length >= 1) {
      console.log('Aguarde a finalização da execução');
      process.exit();
    }

    console.log('Fazendo login no SAP');
    await loginSAP(username);
    await saveBlankFile(executandoPath);

    const arrayPrimario = montarDadosPrimarios(xlsxData);
    const arraySecundario = montarDadosSecundarios(xlsxData);
    const resultado: any[] = [];

    const notaFiscalSemRepeticao = [...new Set(arrayPrimario.map(item => item.nroNF))];

    await initTransacao(codigoTransacao);
    await sleep(3000);
    executarVBS('C:/Projects/Vamos_RequisicaoCompras/transacao.vbs');
    await sleep(3000);

    for (const nroNF of notaFiscalSemRepeticao) {
      const dInicio = moment().format('DD/MM/YYYY HH:mm:ss');
      const filtro = arraySecundario.filter(l => l.nroNF === nroNF);
      let linha = 0;

      for (const info of filtro) {
        const dAtual = moment().format('DD.MM.YYYY');
        await inserindoItens(info.material, info.quantidade, dAtual, info.contrato, info.centroCusto, info.item, linha.toString());
        resultado.push({ ...info, dAtual });
        await sleep(4000);
        executarVBS('C:/Projects/Vamos_RequisicaoCompras/insertLinhas.vbs');
        linha++;
        await sleep(4000);
      }

      await inserindoAnexos(paths.anexo, nomeArquivo, descricao);
      await sleep(4000);
      executarVBS('C:/Projects/Vamos_RequisicaoCompras/insertAnexos.vbs');
      await sleep(4000);

      const status = await ReadTxt(`C:/Users/${username}/Desktop/logConsultaCNPJ.txt`);
      const nroRequisicao = status[1];
      const statusAnexo = status[2];
      const dFim = moment().format('DD/MM/YYYY HH:mm:ss');

      await insertLog(nroNF, nroRequisicao, statusAnexo, area, dInicio, dFim);
    }

    const novaPlanilha = XLSX.utils.json_to_sheet(resultado);
    const nomeAba = 'Resultado';

    if (workbook.SheetNames.includes(nomeAba)) {
      delete workbook.Sheets[nomeAba];
      workbook.SheetNames = workbook.SheetNames.filter(name => name !== nomeAba);
    }

    XLSX.utils.book_append_sheet(workbook, novaPlanilha, nomeAba);
    XLSX.writeFile(workbook, `${paths.andamento}/${nameFile}`);

    await renameFile(
      `${paths.andamento}/${nameFile}`,
      `${paths.finalizados}/${area}${mes}/${dia}/${nameFile}`
    );

    console.log('Aba "Resultado" adicionada e arquivo finalizado.');
  }

  process.exit();
}