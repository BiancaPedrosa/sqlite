const alunoModel = require('../models/alunoModel');

function showForm(req, res) {
    // req.baseUrl é o prefixo onde o router foi montado (ex: /aluno), usado para montar links relativos nas views
    res.render('aluno_insert_form', { base: req.baseUrl });
}

function insert(req, res) {
    const { nome, idade } = req.body;

    alunoModel.create(nome, idade, function(erro) {
        if (erro) return res.send("Erro ao salvar.");
        res.redirect(`${req.baseUrl}/select`);
    });
}

function list(req, res) {
    alunoModel.findAll((erro, linhas) => {
        if (erro) return res.send("Erro ao buscar.");

        // Enviamos o arquivo 'aluno_list.ejs' e injetamos o array 'linhas' dentro da variável 'alunos'
        res.render('aluno_list', { alunos: linhas, base: req.baseUrl });
    });
}

function editForm(req, res) {
    const { id } = req.params;

    alunoModel.findById(id, (err, aluno) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao buscar aluno.');
        }
        // Garanta que o arquivo na pasta views se chama 'aluno_update.ejs' e que ele está configurado para receber a variável 'aluno'
        res.render('aluno_update', { aluno, base: req.baseUrl });
    });
}

function update(req, res) {
    const { id } = req.params;
    const { nome, idade } = req.body;

    alunoModel.update(id, nome, idade, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao atualizar aluno.');
        }
        res.redirect(`${req.baseUrl}/select`);
    });
}

function remove(req, res) {
    const { id } = req.params;

    alunoModel.remove(id, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao excluir aluno.');
        }
        res.redirect(`${req.baseUrl}/select`);
    });
}

module.exports = { showForm, insert, list, editForm, update, remove };
