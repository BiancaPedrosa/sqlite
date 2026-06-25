const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.showForm);
router.post('/insert', alunoController.create);
router.get('/alunos', alunoController.list);
router.get('/update/:id', alunoController.showEdit);
router.post('/update/:id', alunoController.update);
router.post('/delete/:id', alunoController.remove);

module.exports = router;
