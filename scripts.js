const scoreList = document.querySelector(".score_list");
const scoreCards = document.querySelectorAll(".score_card");

let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;

// Função para ajustar a opacidade dos cards
function adjustOpacity() {
  const listRect = scoreList.getBoundingClientRect(); // Área visível do carrossel

  scoreCards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();

    // Verifica se o card está totalmente visível na área do carrossel
    const isVisible =
      cardRect.left >= listRect.left &&
      cardRect.right <= listRect.right;

    // Ajusta a opacidade: 1 se totalmente visível, 0.3 se não estiver
    card.style.opacity = isVisible ? "1" : "0.3";
  });
}

// Eventos de arrastar
scoreList.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDown = true;
  isDragging = false;
  scoreList.classList.add("active");
  startX = e.pageX - scoreList.offsetLeft;
  scrollLeft = scoreList.scrollLeft;

  scoreCards.forEach((card) => {
    card.classList.add("dragging");
  });
});

scoreList.addEventListener("mouseleave", () => {
  isDown = false;
  scoreList.classList.remove("active");

  scoreCards.forEach((card) => {
    card.classList.remove("dragging");
  });
});

scoreList.addEventListener("mouseup", () => {
  isDown = false;
  scoreList.classList.remove("active");

  scoreCards.forEach((card) => {
    card.classList.remove("dragging");
  });

  // Ajusta a opacidade ao soltar
  adjustOpacity();
});

scoreList.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scoreList.offsetLeft;
  const walk = (x - startX) * 2;
  scoreList.scrollLeft = scrollLeft - walk;

  isDragging = true;

  // Ajusta a opacidade durante o movimento
  adjustOpacity();
});

// Ajusta a opacidade ao carregar ou redimensionar a janela
window.addEventListener("load", adjustOpacity);
window.addEventListener("resize", adjustOpacity);

// Ajusta a opacidade ao rolar
scoreList.addEventListener("scroll", adjustOpacity);

document.querySelectorAll(".sc_stars").forEach((starsContainer) => {
  // Extraia o número de estrelas a partir da classe "st_X"
  const starsClass = [...starsContainer.classList].find((cls) => cls.startsWith("st_"));
  if (starsClass) {
    const starCount = parseInt(starsClass.split("_")[1], 10); // Obtém o número de estrelas

    // Adicione as estrelas ao contêiner
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      starsContainer.appendChild(star);
    }
  }
});

const priceContainer = document.querySelector(".price-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        priceContainer.classList.add("in-focus");
      } else {
        priceContainer.classList.remove("in-focus");
      }
    });
  },
  { threshold: 0.5 } // O elemento deve estar 50% visível na tela
);

observer.observe(priceContainer);