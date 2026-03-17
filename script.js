
// script.js — interações básicas do site (PT-BR)
// - Menu mobile (hambúrguer)
// - Scroll suave para âncoras
// - Fechar menu ao clicar em link
// - Validação simples do formulário de contato
// - Carrossel simples da galeria

(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  // Ativa/desativa menu mobile
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav--open');
    });
  }

  // Scroll suave para âncoras internas e fechamento do menu mobile após clique
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Fecha menu em mobile
        if (nav && nav.classList.contains('nav--open')) {
          nav.classList.remove('nav--open');
          navToggle && navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Preenche ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Validação simples do formulário
  const form = document.getElementById('contato-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.querySelector('#nome');
      const msg = form.querySelector('#mensagem');
      const errNome = nome.nextElementSibling; // small.form__error
      const errMsg = msg.nextElementSibling;   // small.form__error
      const feedback = document.getElementById('form-feedback');

      let ok = true;
      // Nome com pelo menos 2 caracteres
      if (!nome.value.trim() || nome.value.trim().length < 2) {
        ok = false;
        errNome.textContent = 'Informe seu nome (mín. 2 caracteres).';
      } else {
        errNome.textContent = '';
      }
      // Mensagem com pelo menos 10 caracteres
      if (!msg.value.trim() || msg.value.trim().length < 10) {
        ok = false;
        errMsg.textContent = 'Descreva sua solicitação (mín. 10 caracteres).';
      } else {
        errMsg.textContent = '';
      }

      if (ok) {
        feedback.textContent = 'Mensagem validada! Para contato imediato, use o WhatsApp.';
        form.reset();
        setTimeout(() => { feedback.textContent = ''; }, 4000);
      }
    });
  }

  // Carrossel simples da galeria (rolagem horizontal)
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const prevBtn = document.querySelector('[data-dir="prev"]');
    const nextBtn = document.querySelector('[data-dir="next"]');

    const scrollAmount = () => Math.round(gallery.clientWidth * 0.9);

    function scroll(dir) {
      gallery.scrollBy({ left: dir === 'next' ? scrollAmount() : -scrollAmount(), behavior: 'smooth' });
    }

    prevBtn && prevBtn.addEventListener('click', () => scroll('prev'));
    nextBtn && nextBtn.addEventListener('click', () => scroll('next'));

    // Teclado: setas esquerda/direita
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { scroll('next'); }
      if (e.key === 'ArrowLeft') { scroll('prev'); }
    });
  }
})();
