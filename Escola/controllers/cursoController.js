const cursoModel = require('../models/cursoModel');

function showForm(req, res) {
    res.render('curso_insert_form', { base: req.baseUrl });
}

function insert(req, res) {
    const { nome, cargaHoraria } = req.body;

    cursoModel.create(nome, cargaHoraria, function(erro) {
        if (erro) return res.send("Erro ao salvar.");
        res.redirect(`${req.baseUrl}/select`);
    });
}

function list(req, res) {
    cursoModel.findAll((erro, linhas) => {
        if (erro) return res.send("Erro ao buscar.");

        res.render('curso_list', { cursos: linhas, base: req.baseUrl });
    });
}

function editForm(req, res) {
    const { id } = req.params;

    cursoModel.findById(id, (err, curso) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao buscar curso.');
        }
        res.render('curso_update', { curso, base: req.baseUrl });
    });
}

function update(req, res) {
    const { id } = req.params;
    const { nome, cargaHoraria } = req.body;

    cursoModel.update(id, nome, cargaHoraria, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao atualizar curso.');
        }
        res.redirect(`${req.baseUrl}/select`);
    });
}

function remove(req, res) {
    const { id } = req.params;

    cursoModel.remove(id, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Erro ao excluir curso.');
        }
        res.redirect(`${req.baseUrl}/select`);
    });
}

module.exports = { showForm, insert, list, editForm, update, remove };
