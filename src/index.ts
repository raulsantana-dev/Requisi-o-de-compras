import { reqCompras } from './app';
import { getWindowsUser } from './utils/helpers';

async function main() {
  const username = getWindowsUser();
  const basePath = `C:/Users/${username}/JSL SA/Grupo Vamos - Execução Robôs - Criação Requisição de Compra`;

  await reqCompras({
    executar: `${basePath}/Executar`,
    andamento: `${basePath}/Em Andamento`,
    finalizados: `${basePath}/Finalizados`,
    anexo: `${basePath}/Anexos`
  });
}

main();