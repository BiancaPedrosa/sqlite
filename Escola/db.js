const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error(erro.message);
    db.run(`CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER, cursoId INTEGER, FOREIGN KEY (cursoId) REFERENCES cursos(id))`);
    // Garante a coluna cursoId em bancos já existentes (criados antes desta alteração)
    db.run(`ALTER TABLE alunos ADD COLUMN cursoId INTEGER REFERENCES cursos(id)`, (erro) => {
        if (erro && !erro.message.includes('duplicate column name')) console.error(erro.message);
    });
    db.run(`CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cargaHoraria INTEGER)`);
    db.run(`CREATE TABLE IF NOT EXISTS matriculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alunoId INTEGER NOT NULL,
        cursoId INTEGER NOT NULL,
        FOREIGN KEY (alunoId) REFERENCES alunos(id),
        FOREIGN KEY (cursoId) REFERENCES cursos(id)
    )`);
});

module.exports = db;
