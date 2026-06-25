const Aluno = require('../models/alunoModel');

const showForm = (req, res) => res.render('insert_form');

const create = (req, res) => {
    const { nome, idade } = req.body;
    Aluno.insert(nome, idade, (erro) => {
        if (erro) return res.status(500).send('Erro ao salvar.');
        res.redirect('/alunos');
    });
};

const list = (req, res) => {
    Aluno.getAll((erro, alunos) => {
        if (erro) return res.status(500).send('Erro ao buscar.');
        res.render('list', { alunos });
    });
};

const showEdit = (req, res) => {
    Aluno.getById(req.params.id, (erro, aluno) => {
        if (erro) return res.status(500).send('Erro ao buscar aluno.');
        res.render('update', { aluno });
    });
};

const update = (req, res) => {
    const { nome, idade } = req.body;
    Aluno.update(nome, idade, req.params.id, (erro) => {
        if (erro) return res.status(500).send('Erro ao atualizar aluno.');
        res.redirect('/alunos');
    });
};

const remove = (req, res) => {
    Aluno.remove(req.params.id, (erro) => {
        if (erro) return res.status(500).send('Erro ao excluir aluno.');
        res.redirect('/alunos');
    });
};

module.exports = { showForm, create, list, showEdit, update, remove };
