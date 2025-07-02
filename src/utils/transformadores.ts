import { Iexcel } from '../types/Iexcel';

export function montarDadosPrimarios(xlsxData: Iexcel[]) {
  return xlsxData.map(linha => ({
    nroNF: linha.NF,
    centroCusto: linha['Centro Custo'],
    descricao: linha['Descrição'],
    contrato: linha.Contrato,
    material: linha.Material,
    item: linha['Item Contrato'],
    quantidade: linha.Quantidade
  }));
}

export function montarDadosSecundarios(xlsxData: Iexcel[]) {
  return xlsxData.map(linha => ({
    nroNF: linha.NF,
    material: linha.Material,
    item: linha['Item Contrato'],
    quantidade: linha.Quantidade,
    contrato: linha.Contrato,
    centroCusto: linha['Centro Custo']
  }));
}
