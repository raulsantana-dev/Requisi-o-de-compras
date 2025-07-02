import { config } from '../config/config';
import * as Snowflake from 'snowflake-sdk';

const connectionConfig = {
  ...config.snowflake,
  database: config.snowflake.database,
};

const connectionConfigAudit = {
  ...config.snowflake,
  database: config.snowflake.auditDatabase,
};
const maxRetries = 10000;
let retryCount = 0;

export async function insertLog(notaFiscal: string, nroRequisicao: string,  statusAnexo: string, areaExecucao: string, createdAT: string, updatedAt: string) {
    while (retryCount < maxRetries) {
        try {
            let kmAtual: any
            const connection = Snowflake.createConnection(connectionConfig);
            await new Promise((resolve, reject) => {
                connection.connect((err, conn) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(conn);
                });
            });
            const query = `
            INSERT INTO RPA."Requisicao Compras Geral" (
            "Nota Fiscal", "Numero Requisicao" ,"Status Anexo", "Area de Execucao", "createdAT", "updatedAt"
            ) VALUES ('${notaFiscal}', '${nroRequisicao}', '${statusAnexo}', '${areaExecucao}', '${createdAT}', '${updatedAt}')`;
            console.log(query)
            await new Promise((resolve, reject) => {
                connection.execute({
                    sqlText: query,
                    complete: (err, stmt, rows) => {
                    },
                });
            });
            // connection.destroy();
            return (kmAtual); // Encerra a função em caso de sucesso
        } catch (error) {
            retryCount++;
            console.error(`Erro na tentativa ${retryCount}: ${error.message}`);
        }
    }
}
export async function ultimoID() {
    while (retryCount < maxRetries) {
        try {
            let status: any
            const connection = Snowflake.createConnection(connectionConfigAudit);
            await new Promise((resolve, reject) => {
                connection.connect((err, conn) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(conn);
                });
            });
            const query = `SELECT MAX(TO_NUMBER(ID_EXECUTE))FROM _AUDIT.LOG.RPA`;
            await new Promise((resolve, reject) => {
                connection.execute({
                    sqlText: query,
                    complete: (err, stmt, rows) => {
                        if (err) {
                            reject(err);
                            return err;
                        }
                        if (rows[0] == undefined) {
                            status = 'Erro ao inserir'
                            resolve(status);
                        } else {
                            status = rows[0];
                            resolve(rows[0]);
                        }
                    },
                });
            });
            connection.destroy(function (err, conn) {
                if (err) {
                    console.error('Unable to disconnect: ');
                } else {
                    console.log('Disconnected connection with id: ');
                }
            });
            return (status); // Encerra a função em caso de sucesso
        } catch (error) {
            retryCount++;
            console.error(`Erro na tentativa ${retryCount}: ${error.message}`);
        }
    }
}