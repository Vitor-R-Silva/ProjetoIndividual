function puxarRanking() {
    console.log("Cheguei no fetch")
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
                            <p class="subtitulo">POSICAO</p>
                            <p> ${posicao} </p>
                        </div>
                        <div class="posicao">
                            <p class="subtitulo">VULGO</p>
                            <p>${tabelas.Username}</p>
                        </div>
                        <div class="posicao">
                            <p class="subtitulo">PONTOS</p>
                            <p> ${tabelas.pontos} </p>
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

