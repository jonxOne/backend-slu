const express = require('express');
const router = express.Router();
const MonitorControler = require('../controllers/monitorController');
const recuperandoSenha = require ("../controllers/recuperarSenhaController")
const sugestao = require("../controllers/emailSugestaoController");

const monitorController = new MonitorControler();

router.get("/monitor/perfil/:id", monitorController.perfil);
router.post('/esqueceuASenha', recuperandoSenha);
router.post('/monitor/Contato/:id', sugestao);
router.post('/monitor/login/home', monitorController.LoginMonitor);

module.exports = router;