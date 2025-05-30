const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const folder = 'C:/Users/Kauan/Desktop/holerites';

const regexName = /Código\s+([A-ZÁÉÍÓÚÃÕÇ\s]+)\s+Nome do Funcionário/;

async function processarPDF(caminhoArquivo) {
    const buffer = fs.readFileSync(caminhoArquivo);
    const data = await pdfParse(buffer);
    const text = data.text;

    const match = text.match(regexName);
    if (match && match[1]) {
        const nome = match[1].trim().replace(/\s+/g, '_');
        return nome;
    }

    return null;
}

async function renomearTodos() {
    const arquivos = fs.readdirSync(folder);

    for (const arquivo of arquivos) {
        const ext = path.extname(arquivo).toLowerCase();
        if (ext === '.pdf') {
            const caminhoCompleto = path.join(folder, arquivo);
            const nomeExtraido = await processarPDF(caminhoCompleto);

            if (nomeExtraido) {
                const novoNome = `HOLERITE_${nomeExtraido}${ext}`;
                const novoCaminho = path.join(folder, novoNome);

                fs.renameSync(caminhoCompleto, novoCaminho);
                console.log(`✅ ${arquivo} → ${novoNome}`);
            } else {
                console.warn(`⚠️ Nome não encontrado em: ${arquivo}`);
            }
        }
    }
}

renomearTodos();