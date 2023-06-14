const perguntas = [
    {
        perguntas: "Qual filme de terror foi dirigido por Roman Polanski e conta a história de uma mulher grávida sendo alvo de uma seita de bruxas?",
        alternativas: [
            { texto: "O Exorcista", resposta: false},
            { texto: "O Bebê de Rosemary", resposta: true},
            { texto: " O Chamado", resposta: false},
            { texto: "O Orfanato", resposta: false},
        ]
    },
    {
        perguntas: "Qual filme de terror é ambientado em uma vila isolada, onde seus habitantes seguem antigas tradições pagãs?",
        alternativas: [
            { texto: "Invocação do Mal", resposta: false},
            { texto: "Hereditário", resposta: false},
            { texto: "Midsommar", resposta: true},
            { texto: "A Casa dos Maus Espíritos", resposta: false},
        ]   
    },
    {
        perguntas: 'Qual filme de terror apresenta uma entidade sobrenatural que se manifesta através de um tabuleiro Ouija?',
        alternativas: [
            { texto: "Ouija: A Origem do Mal", resposta: true},
            { texto: "Annabelle", resposta: false},
            { texto: "A Maldição da Chorona", resposta: false},
            { texto: "A Noiva", resposta: false},
        ]   
    },
    {
        perguntas: 'Qual filme de terror segue a história de uma enfermeira que cuida de uma idosa em uma mansão assombrada?',
        alternativas: [
            { texto: "O Espelho", resposta: true},
            { texto: "A Maldição de Chucky", resposta: false},
            { texto: "O Grito", resposta: false},
            { texto: "Sobrenatural", resposta: false},
        ]   
    },
    {
        perguntas: 'Qual filme de terror é sobre uma mulher que é perseguida por um estranho em sua própria casa?',
        alternativas: [
            { texto: "Invasores", resposta: false},
            { texto: "Hush: A Morte Ouve", resposta: true},
            { texto: "A Hora do Pesadelo", resposta: false},
            { texto: "A Bruxa", resposta: false},
        ]   
    },
    {
        perguntas: 'Qual filme de terror é sobre um grupo de amigos que fica preso em uma cabana na floresta, sendo aterrorizado por criaturas malignas?',
        alternativas: [
            { texto: "Evil Dead (A Morte do Demônio)", resposta: true},
            { texto: "Poltergeist", resposta: false},
            { texto: "O Babadook", resposta: false},
            { texto: "A Última Casa da Rua", resposta: false},
        ]   
    },
    {
        perguntas: '"Qual o seu filme de terror favorito?" é uma frase de qual personagem',
        alternativas: [
            { texto: "Jason", resposta: false},
            { texto: "Freedy Kruger", resposta: false},
            { texto: "Michael Mayers", resposta: false},
            { texto: "Ghostface", resposta: true},
        ]   
    },
    {
        perguntas: 'Qual o nome do conto de Edgar Allan Poe onde o marido assassina sua esposa',
        alternativas: [
            { texto: "O Gato Preto", resposta: true},
            { texto: "O Corvo", resposta: false},
            { texto: "O Barril de Amontillado", resposta: false},
            { texto: "Os Assassinatos da Rua Morgue", resposta: false},
        ]   
    },
    {
        perguntas: 'Qual é o nome do fictício livro proibido e cheio de conhecimentos arcanos mencionado nos contos de H.P. Lovecraft?',
        alternativas: [
            { texto: "O Chamado de Cthulhu", resposta: false},
            { texto: "O Rei de Amarelo", resposta: false},
            { texto: "O diario do coveiro", resposta: false},
            { texto: "Necronomicon", resposta: true},
        ]   
    },
    {
        perguntas: 'Qual filme de terror é ambientado em uma pequena cidade onde uma entidade demoníaca assume a forma de um palhaço para aterrorizar crianças?',
        alternativas: [
            { texto: "O Chamado", resposta: false},
            { texto: "O Exorcista", resposta: false},
            { texto: "O Massacre da Serra Elétrica", resposta: false},
            { texto: "It: A Coisa", resposta: true},
        ]   
    },
];

const pergunta = document.getElementById("pergunta");
const botoes_respostas = document.getElementById("botoes_resposta");
const botao_proximo = document.getElementById("botao_proximo");

let contador_pergunta_atual = 0;
let pontuacao = 0;
let fkUsuario = sessionStorage.ID_USUARIO;


function comecar_quiz(){
    contador_pergunta_atual = 0;
    pontuacao = 0;
    botao_proximo.innerHTML = "Proximo";
    exibirPergunta();
}

function exibirPergunta(){
    redefinirEstado()
    let pergunta_atual = perguntas[contador_pergunta_atual];
    let numero_pergunta = contador_pergunta_atual + 1;
    pergunta.innerHTML = numero_pergunta + ". " + pergunta_atual.perguntas;

    pergunta_atual.alternativas.forEach(alternativas => {
        const button = document.createElement("button");
        button.innerHTML = alternativas.texto;
        button.classList.add("bnt");
        botoes_respostas.appendChild(button);
        if(alternativas.resposta) {
            button.dataset.resposta = alternativas.resposta
        }
        button.addEventListener("click", resposta_selecionada)
    });
}

function redefinirEstado(){
    botao_proximo.style.display = "none";
    while(botoes_respostas.firstChild) {
        botoes_respostas.removeChild(botoes_respostas.firstChild)
    };
}

function resposta_selecionada(alternativas) {
    const botao_selecionado = alternativas.target;
    const certa = botao_selecionado.dataset.resposta === "true";

    if(certa){
        botao_selecionado.classList.add("Certo");
        pontuacao ++     
    } else {
        botao_selecionado.classList.add("Errado");
    }
    Array.from(botoes_respostas.children).forEach(button => {
        if(button.dataset.resposta === "true"){
            button.classList.add("Certo");
        }
        button.disabled = true;
    });
    botao_proximo.style.display = "block";
}

function exibirPontuacao() {
    redefinirEstado();
    pergunta.innerHTML  = `Você fez ${pontuacao} de ${perguntas.length} !`;
    botao_proximo.innerHTML = "Tentar Novamente";
    botao_proximo.style.display = "block"
}

function definir_botao_proximo(){
    contador_pergunta_atual++;
    if(contador_pergunta_atual < perguntas.length){
        exibirPergunta()
    } else {
        exibirPontuacao();
    }
}
function puxarRanking() {
    fetch("/usuarios/buscarDados", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            resposta.json().then(result => {
                var posicao = 0
                for(var i =0; i < result.length; i++){
                    var tabelas = result[i];
                    posicao++
                    document.getElementById("container").innerHTML += `
                    <div class="tabela">
                        <div class="posicao">
                            <p class="subtitulo">Colocacao</p>
                            <p> ${posicao} </p>
                        </div>
                        <div class="posicao">
                            <p class="subtitulo">Nome</p>
                            <p>${tabelas.nome}</p>
                        </div>
                        <div class="posicao">
                            <p class="subtitulo">Pontuacao</p>
                            <p> ${tabelas.pontuacao} </p>
                        </div>
                    </div>
                    `
                    console.log(tabelas)
                };
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao cadastrar',
                text: 'Tente novamente!'
            })
        }
    }).catch(function (resposta) {
        console.log(`ERRO: ${resposta}`);
    });


}

    botao_proximo.addEventListener("click", ()=>{
        if(contador_pergunta_atual < perguntas.length){
            definir_botao_proximo();
        } else {
            console.log("Esse é o valor sendo passado pro fethc do idUsuario:" + fkUsuario);
            fetch("/usuarios/attBancoQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pontuacaoServer: pontuacao,
                    fkUsuarioServer: fkUsuario
                })
            })
            
            comecar_quiz();

        }
    })

comecar_quiz();





