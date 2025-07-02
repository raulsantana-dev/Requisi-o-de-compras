# 🛠️ Automacao de Requisição de Compras no SAP (TypeScript)

Este projeto realiza a automação da criação de requisições de compras para todas as areas da empresa no SAP a partir de planilhas `.xlsx`, executando scripts `.vbs`, manipulando arquivos locais e salvando logs em um banco de dados...

# 📁 Estrutura de Pastas
src/
├── index.ts                     # Ponto de entrada principal
├── types/
│   └── Iexcel.ts               # Tipagem da planilha Excel
├── utils/
│   ├── helpers.ts              # Funções utilitárias (datas, usuário, etc.)
│   └── transformadores.ts      # Processamento dos dados do Excel
├── services/
│   ├── arquivoService.ts       # Leitura, escrita e renomeio de arquivos
│   ├── logService.ts           # Log em banco de dados Snowflake
│   └── sapService.ts           # Execução e login SAP via VBS
│   └── processamentoService.ts # Lógica principal de automação


# ▶️ Como Executar
1. Instale as dependências: `npm install`
2. Configure as variáveis de ambiente (`config.env`)
3. Execute o script principal: `npm start`

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

