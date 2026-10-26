/* 1. Menu móvel: abre e fecha a navegação em telas pequenas. */
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = open ? "✕" : "☰";
  });

  // Fecha o menu ao clicar em qualquer link.
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    });
  });
}

/* 2. Ano automático no rodapé. */
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* 3. Gráfico interativo demonstrativo. */
const canvas = document.querySelector("#focusChart");

if (canvas && window.Chart) {
  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: [
        "Dados e Sustentabilidade",
        "Machine Learning",
        "Programação",
        "Outros"
      ],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: [
          "#F10393",
          "#FE6EF0",
          "#8B0535",
          "#1C1859"
        ],
        borderColor: "#0c0812",
        borderWidth: 4,
        hoverOffset: 9
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#d8cce4",
            padding: 14,
            usePointStyle: true,
            font: {
              family: "Nunito",
              size: 11
            }
          }
        },
        tooltip: {
          backgroundColor: "#100a19",
          borderColor: "#FE6EF0",
          borderWidth: 1,
          callbacks: {
            label: context =>
              ` ${context.label}: ${context.raw}% (ilustrativo)`
          }
        }
      }
    }
  });
}

/* 4. Verificação de preferência por movimento reduzido. */
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* 5. Pequenas estrelas ✦ decorativas. */
if (!reduceMotion) {
  document.querySelectorAll(".page").forEach((section, index) => {
    const star = document.createElement("span");

    star.className = "ambient-star";
    star.setAttribute("aria-hidden", "true");
    star.textContent = index % 2 === 0 ? "✦" : "✧";
    star.style.setProperty("--star-delay", `${index * 0.35}s`);

    section.appendChild(star);
  });
}

/* 6. Efeito de cursor: os elementos acompanham o mouse. */
const finePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (finePointer && !reduceMotion) {
  const hero = document.querySelector(".hero");
  const flowerStage = document.querySelector(".flower-stage");
  const leftEdge = document.querySelector(".edge-left");
  const rightEdge = document.querySelector(".edge-right");

  if (hero) {
    hero.addEventListener("pointermove", event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--pointer-x", `${x * 18}px`);
      hero.style.setProperty("--pointer-y", `${y * 14}px`);

      if (flowerStage) {
        flowerStage.style.setProperty("--mouse-x", `${x * 9}px`);
        flowerStage.style.setProperty("--mouse-y", `${y * 9}px`);
      }

      if (leftEdge) {
        leftEdge.style.setProperty("--move-x", `${x * 5}px`);
        leftEdge.style.setProperty("--move-y", `${y * 9}px`);
      }

      if (rightEdge) {
        rightEdge.style.setProperty("--move-x", `${x * -5}px`);
        rightEdge.style.setProperty("--move-y", `${y * -9}px`);
      }
    });

    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--pointer-x", "0px");
      hero.style.setProperty("--pointer-y", "0px");

      [flowerStage, leftEdge, rightEdge]
        .filter(Boolean)
        .forEach(element => {
          element.style.setProperty("--mouse-x", "0px");
          element.style.setProperty("--mouse-y", "0px");
          element.style.setProperty("--move-x", "0px");
          element.style.setProperty("--move-y", "0px");
        });
    });
  }
}

/* 7. Navegação do carrossel de certificados. */
const trilhaCertificados = document.getElementById(
  "certificados-carrossel"
);

const setaCertAnterior = document.getElementById(
  "seta-cert-anterior"
);

const setaCertProximo = document.getElementById(
  "seta-cert-proximo"
);

if (trilhaCertificados && setaCertAnterior && setaCertProximo) {
  setaCertAnterior.addEventListener("click", () => {
    trilhaCertificados.scrollBy({
      left: -trilhaCertificados.clientWidth * 0.8,
      behavior: "smooth"
    });
  });

  setaCertProximo.addEventListener("click", () => {
    trilhaCertificados.scrollBy({
      left: trilhaCertificados.clientWidth * 0.8,
      behavior: "smooth"
    });
  });
}