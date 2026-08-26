const db = require('../db');

function create(nome, idade, callback) {
    const sql = 'INSERT INTO alunos (nome, idade) VALUES (?, ?)';
    db.run(sql, [nome, idade], callback);
}

function findAll(callback) {
    db.all('SELECT * FROM alunos', callback);
}

function findById(id, callback) {
    const sql = 'SELECT * FROM alunos WHERE id = ?';
    db.get(sql, [id], callback);
}

function update(id, nome, idade, callback) {
    const sql = 'UPDATE alunos SET nome = ?, idade = ? WHERE id = ?';
    db.run(sql, [nome, idade, id], callback);
}

function remove(id, callback) {
    const sql = 'DELETE FROM alunos WHERE id = ?';
    db.run(sql, [id], callback);
}

module.exports = { create, findAll, findById, update, remove };
