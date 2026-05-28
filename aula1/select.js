//script para selecionar dados da tabela 'alunos' usando sqlite3
const sqlite3 = require('sqlite3');

// 1. Abre a conexão com o arquivo local
const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error("Erro ao abrir:", erro.message);

    console.log("Consultando dados...");

    // 2. Executa a consulta
    // 'db.all' busca todas as linhas da tabela
    db.all('SELECT * FROM alunos', (erro, alunos) => {
        if (erro) {
            // Tratamento de erros fundamental
            return console.error("Erro na consulta:", erro.message);
        }

        // 3. Exibe os resultados no console
        console.log("Lista de Alunos:");
        alunos.forEach((aluno) => {
            console.log(`ID: ${aluno.id} - Nome: ${aluno.nome} - Idade: ${aluno.idade}`);
        });
    });
});

// Fecha o banco após a operação
db.close();