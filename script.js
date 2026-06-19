// Seleciona os elementos necessários do HTML
const botaoMensagem = document.getElementById('btn-mensagem');
const paragrafoMensagem = document.getElementById('mensagem');

// Define a função que altera o texto do parágrafo
function exibirMensagemSustentavel() {
    paragrafoMensagem.textContent = "A tecnologia ajuda o produtor a produzir mais, usando menos água e preservando o meio ambiente.";
}

// Vincula o evento de clique do botão à função acima
botaoMensagem.addEventListener('click', exibirMensagemSustentavel);
