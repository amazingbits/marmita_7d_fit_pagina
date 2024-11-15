const scoreList = document.querySelector(".score_list");

let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;

scoreList.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDown = true;
  isDragging = false;
  scoreList.classList.add("active");
  startX = e.pageX - scoreList.offsetLeft;
  scrollLeft = scoreList.scrollLeft;

  // Adiciona a classe "dragging" aos cards
  document.querySelectorAll(".score_card").forEach((card) => {
    card.classList.add("dragging");
  });
});

scoreList.addEventListener("mouseleave", () => {
  isDown = false;
  scoreList.classList.remove("active");

  // Remove a classe "dragging" dos cards
  document.querySelectorAll(".score_card").forEach((card) => {
    card.classList.remove("dragging");
  });
});

scoreList.addEventListener("mouseup", () => {
  isDown = false;
  scoreList.classList.remove("active");

  // Remove a classe "dragging" dos cards
  document.querySelectorAll(".score_card").forEach((card) => {
    card.classList.remove("dragging");
  });
});

scoreList.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scoreList.offsetLeft;
  const walk = (x - startX) * 2; // Multiplica para ajustar a sensibilidade
  scoreList.scrollLeft = scrollLeft - walk;

  // Detecta que está arrastando
  isDragging = true;
});

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