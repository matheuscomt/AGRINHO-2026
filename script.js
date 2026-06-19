/**
 * PROJETO AGRINHO 2026 - SISTEMA DE INTERATIVIDADE INTERNA
 * Desenvolvido por Matheus
 */

// Centraliza todos os elementos do DOM para evitar repetição de seletores
const siteElements = {
    btnImpacto: document.getElementById('btn-mensagem'),
    alertaImpacto: document.getElementById('mensagem'),
    linksNavegacao: document.querySelectorAll('.nav-menu a'),
    secoesConteudo: document.querySelectorAll('.secao-conteudo')
};

/**
 * 1. GERENCIADOR DA INTERAÇÃO DE IMPACTO TECNOLÓGICO
 * Altera apenas o nó de texto puro e delega a exibição e animação visual para o CSS
 */
function dispararAlertaTecnologico() {
    const { alertaImpacto } = siteElements;
    
    if (!alertaImpacto) return;

    // Define o texto informativo de forma segura (nó de texto puro)
    alertaImpacto.textContent = "A revolução tecnológica no campo otimiza recursos preciosos: reduz o consumo de água na irrigação em até 40%, evita o desperdício de insumos químicos por metro quadrado e monitora a saúde da terra em tempo real para proteger os biomas nativos.";
    
    // Adiciona a classe CSS que controla a animação e visibilidade no arquivo style.css
    alertaImpacto.classList.add('is-visible');
}

/**
 * 2. ROLAGEM SUAVE INTEGRADA (SMOOTH SCROLL)
 * Captura cliques nos links do menu e calcula a rolagem compensando a barra fixa
 */
function configurarRolagemDoMenu() {
    siteElements.linksNavegacao.forEach(link => {
        link.addEventListener('click', (evento) => {
            const ancora = link.getAttribute('href');
            
            // Ignora se for link externo ou inválido
            if (!ancora || !ancora.startsWith('#')) return;
            
            evento.preventDefault();
            const elementoAlvo = document.querySelector(ancora);
            
            if (elementoAlvo) {
                // Calcula a posição do elemento descontando a altura exata do menu fixo
                const posicaoFinal = elementoAlvo.getBoundingClientRect().top + window.scrollY - 85;
                
                window.scrollTo({
                    top: posicaoFinal,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 3. DETECTOR DE POSIÇÃO DE TELA (SCROLL SPY)
 * Destaca visualmente no menu superior a seção que o usuário está lendo no momento
 */
function atualizarLinkAtivoPorScroll() {
    let idSecaoAtual = "";
    const margemDeAtivacao = 100; // Distância em pixels antes da seção tocar o topo do menu

    siteElements.secoesConteudo.forEach(secao => {
        const limiteSuperior = secao.offsetTop - margemDeAtivacao;
        const limiteInferior = limiteSuperior + secao.offsetHeight;
        
        if (window.scrollY >= limiteSuperior && window.scrollY < limiteInferior) {
            idSecaoAtual = secao.getAttribute('id');
        }
    });

    // Controla as classes ativas dos botões da nav delegando a estilização para o CSS
    siteElements.linksNavegacao.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${idSecaoAtual}`) {
            link.classList.add('is-active');
        }
    });
}

/**
 * INICIALIZADOR GERAL DO SITE
 * Ativa os ouvintes de eventos (listeners) assim que a página é lida
 */
function inicializarEventosDoSite() {
    // Vincula o clique do botão tecnológico
    if (siteElements.btnImpacto) {
        siteElements.btnImpacto.addEventListener('click', dispararAlertaTecnologico);
    }
    
    // Ativa a rolagem suave nos links do menu
    configurarRolagemDoMenu();
    
    // Escuta a rolagem do usuário para acionar o Scroll Spy
    window.addEventListener('scroll', atualizarLinkAtivoPorScroll);
}

// Dispara a execução da aplicação de Front-End
inicializarEventosDoSite();
