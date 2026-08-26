const express = require('express');
const alunoController = require('../controllers/alunoController');
const router = express.Router();

// ROTA 1: Formulário
router.get('/', alunoController.showForm);

// ROTA 2: Inserir
router.post('/insert', alunoController.insert);

// ROTA 3: Selecionar e Exibir
router.get('/select', alunoController.list);

// ROTA 4: Editar (GET) - Renderiza o formulário preenchido
router.get('/update/:id', alunoController.editForm);

// ROTA 5: Atualizar (POST) - Salva as alterações no banco
router.post('/update/:id', alunoController.update);

// ROTA 6: Excluir (POST) - Remove o aluno do banco
router.post('/delete/:id', alunoController.remove);

module.exports = router;
