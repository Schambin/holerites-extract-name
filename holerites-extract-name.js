const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const readline = require('readline');

const regexNome = /Código\s+([A-ZÁÉÍÓÚÃÕÇ\s]+)\s+Nome do Funcionário/;

async function processarPDF(caminhoArquivo) {
    try {
        const buffer = fs.readFileSync(caminhoArquivo);
        const data = await pdfParse(buffer);
        const texto = data.text;

        const match = texto.match(regexNome);
        if (match && match[1]) {
            const nome = match[1].trim().replace(/\s+/g, '_');
            return nome;
        }
        console.warn(`⚠️ Nome não encontrado no arquivo ${path.basename(caminhoArquivo)}`);
        return null;
    } catch (err) {
        console.error(`❌ Erro ao processar arquivo ${path.basename(caminhoArquivo)}:`, err.message);
        return null;
    }
}

async function renomearTodos(pasta) {
    try {
        const arquivos = fs.readdirSync(pasta);
        if (arquivos.length === 0) {
            console.warn('⚠️ Pasta está vazia.');
            return;
        }

        for (const arquivo of arquivos) {
            const ext = path.extname(arquivo).toLowerCase();
            if (ext === '.pdf') {
                const caminhoCompleto = path.join(pasta, arquivo);
                const nomeExtraido = await processarPDF(caminhoCompleto);

                if (nomeExtraido) {
                    const novoNome = `HOLERITE_${nomeExtraido}${ext}`;
                    const novoCaminho = path.join(pasta, novoNome);

                    try {
                        fs.renameSync(caminhoCompleto, novoCaminho);
                        console.log(`✅ ${arquivo} → ${novoNome}`);
                    } catch (err) {
                        console.error(`❌ Erro ao renomear ${arquivo}:`, err.message);
                    }
                } else {
                    console.warn(`⚠️ Nome não encontrado ou erro no arquivo: ${arquivo}`);
                }
            }
        }
    } catch (err) {
        console.error('❌ Erro ao ler pasta:', err.message);
    }
}

// Função para perguntar no terminal
function perguntarPergunta(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

async function main() {
    try {
        const pasta = await perguntarPergunta('Informe o caminho da pasta dos holerites (ex: C:/Users/Kauan/Desktop/holerites): ');
        if (!fs.existsSync(pasta)) {
            console.error('Pasta não encontrada! Verifique o caminho e tente novamente.');
            console.log('Pressione Enter para sair...');
            await perguntarPergunta('');
            process.exit(1);
        }

        await renomearTodos(pasta);
        console.log('Processamento finalizado!');
        console.log('Pressione Enter para sair...');
        await perguntarPergunta('');
    } catch (err) {
        console.error('Erro inesperado:', err.message);
        console.log('Pressione Enter para sair...');
        await perguntarPergunta('');
        process.exit(1);
    }
}

main();