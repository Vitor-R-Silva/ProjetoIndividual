var express = require("express");
var router = express.Router();

var rankingController = require("../controllers/rankingController");

router.get("/buscarDados", function (req, res) {
    rankingController.buscarDados(req, res);
});

module.exports = router;