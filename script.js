/* ============================================================
   AGRINHO 2026 — main.js
   Interações: nav, partículas, reveal, contadores, tilt 3D
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProgressBar();
  initParticles();
  initReveal();
  initCounters();
  initTilt();
});

/* ---------- NAV: scroll, menu mobile, link ativo ---------- */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Destaca o link da seção visível
  const sections = document.querySelectorAll('section[id]');
  const navLinks = links.querySelectorAll('a');

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => spy.observe(s));
}

/* ---------- Barra de progresso de leitura ---------- */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total) * 100 + '%';
  }, { passive: true });
}

/* ---------- Partículas: esporos/vagalumes flutuando ---------- */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  const COLORS = ['168,224,99', '61,220,132', '230,195,92'];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function build() {
    const count = Math.min(70, Math.floor(w / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.08),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function tick(t) {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx + Math.sin(t / 2400 + p.phase) * 0.18;
      p.y += p.vy;

      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const glow = p.alpha * (0.65 + 0.35 * Math.sin(t / 900 + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + glow + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(' + p.color + ',0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(tick);
  }

  resize();
  build();
  window.addEventListener('resize', () => { resize(); build(); });
  requestAnimationFrame(tick);
}

/* ---------- Reveal ao rolar ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i % 4) * 90 + 'ms';
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ---------- Contadores animados ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => io.observe(c));

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 2000;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const value = target * eased;
      el.textContent = value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
}

/* ---------- Tilt 3D nos cards ---------- */
function initTilt() {
  const cards = document.querySelectorAll('.tilt');
  const MAX = 9; // graus

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'perspective(800px) rotateY(' + (px * MAX) + 'deg) rotateX(' + (-py * MAX) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}


/* ============================================================
   AGRINHO 2026 — charts.js
   Gráficos com Chart.js — dados: Conab / IBGE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  const LIME = '#a8e063';
  const LEAF = '#3ddc84';
  const GOLD = '#e6c35c';
  const MUTED = '#9db8a5';
  const GRID = 'rgba(168, 224, 99, 0.08)';

  Chart.defaults.font.family = "'Sora', sans-serif";
  Chart.defaults.color = MUTED;

  const tooltipStyle = {
    backgroundColor: 'rgba(6, 19, 13, 0.95)',
    borderColor: 'rgba(168, 224, 99, 0.3)',
    borderWidth: 1,
    titleColor: LIME,
    bodyColor: '#e8f3ea',
    padding: 12,
    cornerRadius: 10,
    displayColors: false
  };

  /* Anima os gráficos só quando aparecem na tela */
  const lazyChart = (id, buildFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildFn(el);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
  };

  /* ---------- 1. Linha: evolução da safra (Conab) ---------- */
  lazyChart('chartSafra', el => {
    const ctx = el.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, 'rgba(61, 220, 132, 0.35)');
    grad.addColorStop(1, 'rgba(61, 220, 132, 0)');

    new Chart(el, {
      type: 'line',
      data: {
        labels: ['15/16', '17/18', '19/20', '21/22', '22/23', '23/24', '24/25', '25/26*'],
        datasets: [{
          label: 'Milhões de toneladas',
          data: [186.6, 227.7, 257.0, 271.4, 322.8, 297.8, 352.3, 356.3],
          borderColor: LEAF,
          backgroundColor: grad,
          fill: true,
          tension: 0.42,
          borderWidth: 3,
          pointBackgroundColor: '#06130d',
          pointBorderColor: LIME,
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: LIME
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1600, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              label: c => ' ' + c.parsed.y.toLocaleString('pt-BR') + ' milhões de t'
            }
          }
        },
        scales: {
          y: {
            grid: { color: GRID },
            ticks: { callback: v => v + ' Mt' },
            suggestedMin: 150
          },
          x: { grid: { display: false } }
        }
      }
    });
  });

  /* ---------- 2. Rosca: composição da safra 25/26 ---------- */
  lazyChart('chartComposicao', el => {
    new Chart(el, {
      type: 'doughnut',
      data: {
        labels: ['Soja', 'Milho', 'Arroz, algodão, feijão, trigo e outros'],
        datasets: [{
          data: [179.15, 139.57, 37.6],
          backgroundColor: [LEAF, GOLD, 'rgba(168, 224, 99, 0.35)'],
          borderColor: '#0a1d14',
          borderWidth: 4,
          hoverOffset: 14
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        animation: { animateRotate: true, duration: 1600 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, pointStyle: 'circle', padding: 18, font: { size: 11 } }
          },
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              label: c => ' ' + c.parsed.toLocaleString('pt-BR') + ' milhões de t'
            }
          }
        }
      }
    });
  });

  /* ---------- 3. Barras: economia com tecnologias ---------- */
  lazyChart('chartTech', el => {
    const ctx = el.getContext('2d');
    const gradBar = ctx.createLinearGradient(0, 0, 600, 0);
    gradBar.addColorStop(0, LEAF);
    gradBar.addColorStop(1, LIME);

    new Chart(el, {
      type: 'bar',
      data: {
        labels: [
          'Plantio direto — redução de erosão',
          'Drones — redução de defensivos',
          'Irrigação inteligente — economia de água',
          'Agricultura de precisão — economia de insumos'
        ],
        datasets: [{
          label: '% estimada de redução',
          data: [70, 60, 50, 30],
          backgroundColor: gradBar,
          borderRadius: 10,
          barThickness: 26
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1600, easing: 'easeOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            ...tooltipStyle,
            callbacks: { label: c => ' até ' + c.parsed.x + '% de redução' }
          }
        },
        scales: {
          x: {
            grid: { color: GRID },
            max: 80,
            ticks: { callback: v => v + '%' }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          }
        }
      }
    });
  });
});
