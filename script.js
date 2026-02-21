// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple carousel logic (works for every element that has data-carousel)
function setupCarousel(root) {
  const viewport = root.querySelector(".car__viewport");
  const slides = Array.from(root.querySelectorAll(".car__img"));
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");
  const dotsWrap = root.querySelector("[data-dots]");

  let index = 0;

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.type = "button";
    d.setAttribute("aria-label", `Go to image ${i + 1}`);
    d.addEventListener("click", () => {
      index = i;
      render();
    });
    dotsWrap.appendChild(d);
    return d;
  });

  function render() {
    viewport.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    render();
  }

  function next() {
    index = (index + 1) % slides.length;
    render();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Optional: keyboard support when focused
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  render();
}

document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
