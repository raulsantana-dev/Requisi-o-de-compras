import { exec } from 'child_process';
import shell from 'shelljs';
import fs from 'fs';
import { getWindowsUser } from '../utils/helpers';
const username = getWindowsUser();
export function loginSAP(username: string) {
  exec('C:/Program Files (x86)/SAP/FrontEnd/SAPgui/saplogon.exe');
  return new Promise(res => setTimeout(res, 6000)).then(() => {
    shell.exec(`LoginSap.vbs`);
    return new Promise(res2 => setTimeout(res2, 8000));
  });
}

export function executarVBS(scriptPath: string) {
  shell.exec(scriptPath);
}

export async function inserindoItens(material: string, qtd: string, dataAtual: string, contrato: string, centroCusto: string, item: string, linha: string): Promise<string[] | string> {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(`C:/Projetos/Vamos_RequisicaoCompras/insertLinhas.vbs`, `Set objFSO=CreateObject("Scripting.FileSystemObject")      
        
        Dim SAPGuiApp, SapGuiAuto, Connection, session, WScript
        If Not IsObject(SAPGuiApp) Then
           Set SapGuiAuto = GetObject("SAPGUI")
           Set SAPGuiApp = SapGuiAuto.GetScriptingEngine
        End If
        If Not IsObject(Connection) Then
        Set Connection = SAPGuiApp.Children(0)
        End If
        If Not IsObject(session) Then
           Set session = Connection.Children(0)
        End If
        If IsObject(WScript) Then
           WScript.ConnectObject session, "on"
           WScript.ConnectObject SAPGuiApp, "on"
        End If
                          
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "KNTTP", "K" 'Centro
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "MATNR", "${material}" 'Material 
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "NAME1", "LC01" 'Centro Local      
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "MENGE", "${qtd}" 'Quantidade
        'session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "PREIS", "" 'Preço aval.
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha},"EEIND","${dataAtual}" 'Dt.remessa
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "LGOBE", "9999" 'Depósito
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha},"EKGRP","I01" 'grupo de compradores
        session.findById("wnd[0]/tbar[0]/btn[0]").press 'botão continuar
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0019/subSUB3:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:1301/subSUB2:SAPLMEGUI:3303/tabsREQ_ITEM_DETAIL/tabpTABREQDT6/ssubTABSTRIPCONTROL1SUB:SAPLMEVIEWS:1101/subSUB2:SAPLMEACCTVI:0100/subSUB1:SAPLMEACCTVI:1000/tblSAPLMEACCTVIDYN_1000TC/ctxtMEACCT1000-KOSTL[5,0]").text = "${centroCusto}"
        session.findById("wnd[0]/tbar[0]/btn[0]").press 'botão continuar
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0019/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI3212:/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha},"KONNR","${contrato}" 'contrato
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0019/subSUB2:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3212/cntlGRIDCONTROL/shellcont/shell").modifyCell ${linha}, "KTPNR", "${item}" 'item nota fiscal
        session.findById("wnd[0]/tbar[0]/btn[0]").press 'botão continuar
        
        'Fechando a aba detalhe item
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0019/subSUB3:SAPLMEVIEWS:1100/subSUB1:SAPLMEVIEWS:4002/btnDYN_4000-BUTTON").press
        `,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        resolve("Arquivo gravado com sucesso!")
    })
}


export async function inserindoAnexos(caminhoPasta: string, nomeArquivo: string, descricao: string): Promise<string[] | string> {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(`C:/Projetos/Vamos_RequisicaoCompras/insertAnexos.vbs`, `Set objFSO=CreateObject("Scripting.FileSystemObject")      
        
        Dim SAPGuiApp, SapGuiAuto, Connection, session, WScript
        If Not IsObject(SAPGuiApp) Then
           Set SapGuiAuto = GetObject("SAPGUI")
           Set SAPGuiApp = SapGuiAuto.GetScriptingEngine
        End If
        If Not IsObject(Connection) Then
           Set Connection = SAPGuiApp.Children(0)
        End If
        If Not IsObject(session) Then
           Set session = Connection.Children(0)
        End If
        If IsObject(WScript) Then
           WScript.ConnectObject session, "on"
           WScript.ConnectObject SAPGuiApp, "on"
        End If
        
        '--- ANEXAR ARQUIVO
        session.findById("wnd[0]/titl/shellcont/shell").pressContextButton "%GOS_TOOLBOX"
        session.findById("wnd[0]/titl/shellcont/shell").selectContextMenuItem "%GOS_PCATTA_CREA"
        session.findById("wnd[1]/usr/ctxtDY_PATH").Text = "${caminhoPasta}" 'somente o caminho do arquivo
        session.findById("wnd[1]/usr/ctxtDY_FILENAME").Text = "${nomeArquivo}" 'nome do arquivo com a extensão
        session.findById("wnd[1]/tbar[0]/btn[0]").press
        
        'Verifica se houve problema com o anexo
        If session.findById("wnd[0]/sbar").Text = "O anexo não foi criado" Or session.findById("wnd[0]/sbar").Text = "O file não existe" Then
            intErro = session.findById("wnd[0]/sbar").Text
        End If
        
        'abrindo tela para observação
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB1:SAPLMEVIEWS:1100/subSUB1:SAPLMEVIEWS:4000/btnDYN_4000-BUTTON").press
        session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0013/subSUB1:SAPLMEVIEWS:1100/subSUB2:SAPLMEVIEWS:1200/subSUB1:SAPLMEGUI:3102/tabsREQ_HEADER_DETAIL/tabpTABREQHDT1/ssubTABSTRIPCONTROL3SUB:SAPLMEGUI:1230/subTEXTS:SAPLMMTE:0100/subEDITOR:SAPLMMTE:0101/cntlTEXT_EDITOR_0101/shellcont/shell").text = "${descricao}"
        
        'salvando requisição de compras
        session.findById("wnd[0]/tbar[0]/btn[11]").press
        session.findById("wnd[0]/tbar[0]/btn[11]").press
        txtRCSAP = Right(session.findById("wnd[0]/sbar").Text, 8)
        
        outFile="C:/Users/${username}/Desktop/logDadosCNPJ.txt"
        Set objFile = objFSO.CreateTextFile(outFile,True)
        objFile.Write "ARQ" & "|" & txtRCSAP & "|" & intErro
        objFile.Close`,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        resolve("Arquivo gravado com sucesso!")
    })
}

export async function initTransacao(codigoTransacao: string): Promise<string[] | string> {
    return new Promise(async (resolve, reject) => {
        fs.writeFile(`C:/Projetos/Vamos_RequisicaoCompras/transacao.vbs`, `Set objFSO=CreateObject("Scripting.FileSystemObject")      
        
       If Not IsObject(application) Then
   Set SapGuiAuto  = GetObject("SAPGUI")
   Set application = SapGuiAuto.GetScriptingEngine
End If
If Not IsObject(connection) Then
   Set connection = application.Children(0)
End If
If Not IsObject(session) Then
   Set session    = connection.Children(0)
End If
If IsObject(WScript) Then
   WScript.ConnectObject session,     "on"
   WScript.ConnectObject application, "on"
End If
session.findById("wnd[0]").maximize
session.findById("wnd[0]/tbar[0]/okcd").text = "/NME51N"
session.findById("wnd[0]").sendVKey 0
session.findById("wnd[0]/usr/subSUB0:SAPLMEGUI:0016/subSUB0:SAPLMEGUI:0030/subSUB1:SAPLMEGUI:3327/cmbMEREQ_TOPLINE-BSART").key = "${codigoTransacao}"

        `,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });

        resolve("Arquivo gravado com sucesso!")
    })
}