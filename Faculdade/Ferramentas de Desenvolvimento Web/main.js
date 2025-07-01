// Menu mobile toggle
// Mostra/esconde o menu em telas pequenas
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Fecha o menu ao clicar em um link
// Útil para mobile
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Scroll suave para âncoras internas
// Melhora a navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação das barras de habilidades
// Faz as barras animarem quando aparecem na tela
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observa cada categoria de habilidades
// Para animar as barras
document.querySelectorAll(".skill-category").forEach((category) => {
  skillObserver.observe(category);
});

// Animação de fade-in para elementos
// Deixa a entrada mais suave
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Aplica fade-in em cards, habilidades e contatos
// Melhora a experiência visual
document
  .querySelectorAll(".project-card, .skill-category, .contact-item")
  .forEach((el) => {
    fadeObserver.observe(el);
  });

// Menu ativo conforme a rolagem
// Destaca o link do menu da seção visível
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Formulário de contato
// Simula envio e mostra alerta de sucesso
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simular envio do formulário
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    // Simular delay de envio
    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Efeito ripple nos botões
// Cria um efeito visual ao clicar
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Parallax suave no hero
// Move o fundo da hero levemente ao rolar
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Efeito de fade nas imagens ao carregar
// E fallback para imagens quebradas
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.classList.add("loaded");
  });

  img.addEventListener("error", function () {
    this.src =
      "https://via.placeholder.com/400x300/cccccc/666666?text=Imagem+não+disponível";
  });
});

// Tooltip para tecnologias
// Mostra o nome da tecnologia ao passar o mouse
document.querySelectorAll(".tech-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = this.textContent;
    tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        `;

    document.body.appendChild(tooltip);

    const rect = this.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px";

    setTimeout(() => {
      tooltip.style.opacity = "1";
    }, 10);

    this.tooltip = tooltip;
  });

  tag.addEventListener("mouseleave", function () {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  });
});

// Preloader (caso exista)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }
});

// Mensagem no console
console.log(
  `\n%c🚀 Willian Laurindo - Full Stack Developer\n%c\n%cPortfólio desenvolvido com HTML, CSS e JavaScript puro.\n%cEspecializado em React, Node.js e tecnologias web modernas.\n%c\n%c📧 Contato: willian.lrdo@gmail.com\n%c📱 Telefone: (41) 99774-8719\n%c🌐 GitHub: github.com/willianlaurindo\n%c\n`,
  "color: #007eff; font-size: 20px; font-weight: bold;",
  "",
  "color: #666; font-size: 14px;",
  "color: #666; font-size: 14px;",
  "",
  "color: #007eff; font-size: 12px;",
  "color: #007eff; font-size: 12px;",
  "color: #007eff; font-size: 12px;",
  ""
);
