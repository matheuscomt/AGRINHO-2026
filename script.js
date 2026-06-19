// Seleciona os elementos necessários do HTML
const botaoMensagem = document.getElementById('btn-mensagem');
const paragrafoMensagem = document.getElementById('mensagem');
const linksMenu = document.querySelectorAll('nav a');

/**
 * Exibe a mensagem de impacto tecnológico com efeito visual suave
 */
function exibirMensagemSustentavel() {
    // Define o texto da mensagem
    paragrafoMensagem.textContent = "A tecnologia ajuda o produtor a produzir mais, usando menos água e preservando o meio ambiente.";
    
    // Faz o elemento aparecer no layout (mudando o 'none' do CSS)
    paragrafoMensagem.style.display = 'block';
    
    // Cria uma animação simples e moderna usando a API de Animações do navegador
    paragrafoMensagem.animate(
        [
            { opacity: 0, transform: 'translateY(-10px)' }, // Estado inicial (invisível e um pouco acima)
            { opacity: 1, transform: 'translateY(0)' }     // Estado final (visível na posição correta)
        ], 
        {
            duration: 400, // Duração de 400 milissegundos
            easing: 'ease-out' // Transição desacelerada mais natural
        }
    );
}

/**
 * Adiciona rolagem suave para as seções ao clicar nos links da navegação
 */
linksMenu.forEach(link => {
    link.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evita o pulo brusco padrão da tag <a>
        
        // Pega o id do destino (ex: #sustentabilidade)
        const idDestino = link.getAttribute('href'); 
        const secaoDestino = document.querySelector(idDestino);
        
        if (secaoDestino) {
            // Faz a página rolar suavemente até o elemento, descontando a altura do menu fixo
            const topoAlvo = secaoDestino.getBoundingClientRect().top + window.scrollY - 60;
            
            window.scrollTo({
                top: topoAlvo,
                behavior: 'smooth'
            });
        }
    });
});

// Vincula o evento de clique do botão à função de exibição
botaoMensagem.addEventListener('click', exibirMensagemSustentavel);
