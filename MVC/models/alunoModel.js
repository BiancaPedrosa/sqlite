const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./escola.db', (erro) => {
    if (erro) return console.error(erro.message);
    db.run(`CREATE TABLE IF NOT EXISTS alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER)`);
});

const getAll = (callback) =>
    db.all('SELECT * FROM alunos', callback);

const getById = (id, callback) =>
    db.get('SELECT * FROM alunos WHERE id = ?', [id], callback);

const insert = (nome, idade, callback) =>
    db.run('INSERT INTO alunos (nome, idade) VALUES (?, ?)', [nome, idade], callback);

const update = (nome, idade, id, callback) =>
    db.run('UPDATE alunos SET nome = ?, idade = ? WHERE id = ?', [nome, idade, id], callback);

const remove = (id, callback) =>
    db.run('DELETE FROM alunos WHERE id = ?', [id], callback);

module.exports = { getAll, getById, insert, update, remove };
