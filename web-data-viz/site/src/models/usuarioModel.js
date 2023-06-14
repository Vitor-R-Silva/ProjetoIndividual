var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pontuar(qtdAcertos, idUsuario) {
  
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        insert into quiz (fkUsuario, pontos) values ('${idUsuario}','${qtdAcertos}');`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mandarPontuacao (fkUsuario, pontuacao) {
    var instrucao = `INSERT INTO quiz (fkUsuario, pontuacao) VALUES
    (${fkUsuario}, ${pontuacao});`
    return database.executar(instrucao)
}

function carregarTop10() {
    console.log("To na model do select do ranking");
    var instrucao = `SELECT usuario.nome, quiz.pontuacao from usuario join quiz on idUsuario = fkUsuario;`
    return database.executar(instrucao)
}

module.exports = {
    autenticar,
    cadastrar,
    pontuar,
    mandarPontuacao,
    carregarTop10
};