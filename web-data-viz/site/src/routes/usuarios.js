var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/pontuar/:qntAcertosServer/:idUsuarioServer", function (req, res) {
    usuarioController.pontuar(req, res);
});


router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/attBancoQuiz", function (req, res){
    usuarioController.mandarPontuacao(req, res);
})
router.get("/buscarDados", function (req, res){
    console.log("To na rota do buscar dados");
    usuarioController.carregarTop10(req, res);
})

module.exports = router;