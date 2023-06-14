var database = require("../database/config")

function buscarDados() {
    var instrucao = `
    select usuario.nome, quiz.pontuacao from usuario join quiz on  idUsuario = fkUsuario order by pontuacao desc limit 10
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarDados,
};