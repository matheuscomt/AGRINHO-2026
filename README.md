# 🌱 AGRINHO 2026 — Agro Forte, Futuro Sustentável

Site desenvolvido para o **Concurso Agrinho 2026** (SEED-PR / Sistema FAEP-SENAR-PR), sobre o tema oficial:

> **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**

Uma página única (one-page) com visual futurista e minimalista, paleta de verdes naturais do agro, gráficos interativos com dados reais e efeitos visuais 3D.

**by Matheus V. • 2026**

---

## 📁 Estrutura do projeto

```
agrinho-2026/
    ├── README.md              → esta documentação
    ├── index.html         → estrutura e conteúdo da página
    ├── style.css          → todos os estilos (paleta, animações, responsivo)
    ├── script.js          → interações (nav, partículas, reveal, contadores, tilt 3D) + gráficos Chart.js
    └── assets/
        ├── agrinho_ia1.png → mascote Agrinho / sustentabilidade (gerada por IA)
        └── agrinho_ia2.png → tecnologia e sensores na lavoura (gerada por IA)
```

HTML, CSS e JavaScript ficam em **arquivos separados**, todos juntos dentro da pasta `public/` ao lado da `index.html`.

---

## 🚀 Como rodar

1. Abra `public/index.html` direto no navegador — não precisa de servidor.
2. Internet é necessária para carregar as fontes (Google Fonts) e a biblioteca de gráficos (Chart.js via CDN).

### Publicar no GitHub Pages

O GitHub Pages só serve a partir da **raiz** do repositório ou da pasta **/docs**. Duas opções:

- **Opção A (recomendada):** renomear a pasta `public` para `docs` e, em *Settings → Pages*, escolher `main` + `/docs`.
- **Opção B:** subir o **conteúdo** da pasta `public` na raiz do repositório.

---

## 🎨 Design

| Item | Escolha |
|---|---|
| Tema | Escuro, futurista e minimalista |
| Paleta | Verde-floresta profundo `#06130d`, verde-folha `#3ddc84`, lima `#a8e063`, dourado-trigo `#e6c35c` |
| Tipografia | **Unbounded** (títulos) + **Sora** (texto) — Google Fonts |
| Atmosfera | Grid 3D em perspectiva no hero, glow radial, partículas animadas (vagalumes/esporos em canvas) |

### Efeitos e interações

- Partículas flutuantes em `<canvas>` cobrindo a página toda
- Cards com **tilt 3D** que seguem o mouse (perspective + rotateX/rotateY)
- Contadores animados nas estatísticas do hero (easing cubic)
- Reveal progressivo das seções ao rolar (IntersectionObserver)
- Barra de progresso de leitura no topo
- Nav com scroll-spy (destaca a seção ativa) e menu mobile animado
- Zoom suave nas imagens, timeline com hover e scrollbar personalizada
- Acessibilidade: respeita `prefers-reduced-motion`

---

## 📊 Gráficos

Os três gráficos são renderizados só quando entram na tela (lazy + animação):

1. **Linha** — Evolução da safra brasileira de grãos (2015/16 → 2025/26)
2. **Rosca** — Composição da safra 2025/26 (soja, milho e demais culturas)
3. **Barras horizontais** — Economia estimada de recursos com tecnologias sustentáveis

### Dados utilizados

| Dado | Valor | Fonte |
|---|---|---|
| Safra de grãos 2025/26 (estimativa) | 356,3 milhões de t (recorde) | Conab — 7º Levantamento |
| Soja 2025/26 | 179,15 milhões de t | Conab |
| Milho 2025/26 | 139,57 milhões de t | Conab |
| Área plantada | 83,3 milhões de ha | Conab |
| Produtividade média | 4.276 kg/ha | Conab |
| Safra 2025 (fechada) | 346,1 milhões de t | IBGE/Secom |

Os percentuais de economia das tecnologias (precisão, irrigação, drones, plantio direto) são estimativas médias divulgadas pelo setor (Embrapa e fabricantes).

---

## 🧩 Seções do site

1. **Hero** — título, tema oficial e estatísticas animadas
2. **Cenário** — introdução ao agronegócio brasileiro + imagem `agrinho_ia1.png`
3. **Números** — os 3 gráficos interativos com dados reais
4. **Sustentabilidade** — timeline: nascentes, solo, água e desmatamento
5. **Tecnologia** — banner `agrinho_ia2.png` + 6 cards: precisão, irrigação, drones, solar, sensores e biológicos
6. **Desafios** — desmatamento, carbono e poluição do solo
7. **Futuro** — conclusão do tema
8. **Footer** — créditos e fontes

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 puro (variáveis, grid, animações, backdrop-filter, media queries)
- JavaScript vanilla (sem frameworks)
- [Chart.js 4](https://www.chartjs.org/) via CDN
- Google Fonts (Unbounded + Sora)
