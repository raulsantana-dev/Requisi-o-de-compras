# 🛠️ Requisição de Compras no SAP (TypeScript)

Este projeto realiza a automação da criação de requisições de compras para todas as areas da empresa no SAP a partir de planilhas `.xlsx`, executando scripts `.vbs`, manipulando arquivos locais e salvando logs em um banco de dados.

# ✅ Tecnologias utilizadas

## ✅ Tecnologias utilizadas

 **Node.js**  
 **TypeScript**  
 **SAP GUI Scripting (VBS)**  
 **Snowflake-SDK**  
 **xlsx**  
 **shelljs**  
 **dotenv**  
 **moment**  



# 📁 Estrutura de Pastas
- index.ts — Ponto de entrada principal
- app.ts - Logica principal da automação

### 📁 database
- `snowflake.ts` —   Log em banco de dados Snowflake

### 📁 config
- `config.ts` — Carrega variáveis de ambiente e configurações gerais  

### 📁 services  
- `sapService.ts` — Execução e login SAP via VBS  
- `processamentoService.ts` — Leitura, escrita e renomeio de arquivos

### 📁 utils
- `helpers.ts` — Funções utilitárias (datas, usuário, etc.)  
- `transformadores.ts` — Processamento dos dados do Excel

### 📁 types
- `Iexcel.ts` — Tipagem da planilha Excel

# ▶️ Como Executar
Instale as dependências: `npm install`
Configure as variáveis de ambiente (`config.env`)
Execute o script principal: `npm start`

# 🧾 Requisitos

Node.js + TypeScript

SAP GUI instalado

Scripts .vbs funcionais no caminho:

LoginSap.vbs

transacao.vbs

insertLinhas.vbs

insertAnexos.vbs

# 📌 Funcionalidades

Leitura de planilhas Excel (.xlsx)

Identificação de arquivos prontos para execução

Geração de logs de execução

Inserção de requisições e anexos no SAP

Salva resultados em uma nova aba Excel chamada Resultado

# ✅ Melhorias Futuras

Suporte a múltiplos tipos de requisições

Testes unitários com Jest

Interface CLI ou Web para monitoramento

# 📄 Licença

Projeto privado para fins internos do time de RPA/Automatização.

