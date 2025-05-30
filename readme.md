# Processador de Holerites em PDF

Este projeto tem como objetivo extrair informações de arquivos PDF de holerites de forma automática. Foi desenvolvido para ser usado por pessoas leigas em programação, bastando apenas executar o arquivo `.bat` para iniciar o processamento.

## Funcionalidades

- Leitura de todos os arquivos `.pdf` em uma pasta especificada
- Extração automática de informações (como nome do colaborador, etc.)
- Exibição dos resultados ou mensagens de erro no terminal
- Utilização simplificada por meio de um executável

## Como usar

1. Coloque todos os arquivos PDF dos holerites em uma pasta.
2. Execute o arquivo `run-holerites.bat`.
3. Informe o caminho completo da pasta quando solicitado.
4. Aguarde o processamento.
5. Verifique os nomes extraídos ou os erros listados no terminal.

## Requisitos (para desenvolvimento)

- Node.js (v18 ou superior)
- npm

## Instale as dependências com:

```bash
npm install
```

## Execute o projeto com:

```bash
node index.js
```

## Estrutura

```pgsql
holerites-extract-name/
├── iniciar.bat
├── index.js
├── package.json
├── node_modules/
└── .gitignore
```

Observações
O projeto utiliza a biblioteca pdf-parse para leitura de PDFs.
