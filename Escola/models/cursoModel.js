const db = require('../db');

function create(nome, cargaHoraria, callback) {
    const sql = 'INSERT INTO cursos (nome, cargaHoraria) VALUES (?, ?)';
    db.run(sql, [nome, cargaHoraria], callback);
}

function findAll(callback) {
    db.all('SELECT * FROM cursos', callback);
}

function findById(id, callback) {
    const sql = 'SELECT * FROM cursos WHERE id = ?';
    db.get(sql, [id], callback);
}

function update(id, nome, cargaHoraria, callback) {
    const sql = 'UPDATE cursos SET nome = ?, cargaHoraria = ? WHERE id = ?';
    db.run(sql, [nome, cargaHoraria, id], callback);
}

function remove(id, callback) {
    const sql = 'DELETE FROM cursos WHERE id = ?';
    db.run(sql, [id], callback);
}

module.exports = { create, findAll, findById, update, remove };
