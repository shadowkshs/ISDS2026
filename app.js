const conferenceDate = new Date("2026-11-14T08:00:00+08:00");
const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMinutes = document.getElementById("countMinutes");
const countSeconds = document.getElementById("countSeconds");

function updateCountdown() {
  const now = new Date();
  const diff = conferenceDate.getTime() - now.getTime();

  if (diff <= 0) {
    countDays.textContent = "0";
    countHours.textContent = "0";
    countMinutes.textContent = "0";
    countSeconds.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countDays.textContent = String(days);
  countHours.textContent = String(hours).padStart(2, "0");
  countMinutes.textContent = String(minutes).padStart(2, "0");
  countSeconds.textContent = String(seconds).padStart(2, "0");
}

function createStaticCarousel(config) {
  const track = document.getElementById(config.trackId);
  const slides = Array.from(track?.querySelectorAll(".slide") || []);
  const prevBtn = document.getElementById(config.prevId);
  const nextBtn = document.getElementById(config.nextId);
  const dotsWrap = document.getElementById(config.dotsId);

  if (!track || slides.length === 0 || !dotsWrap) return;

  let index = 0;
  let timer;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
      dot.addEventListener("click", () => goTo(idx));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(target) {
    index = (target + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === index));
    Array.from(dotsWrap.children).forEach((dot, idx) => dot.classList.toggle("active", idx === index));
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAuto() {
    if (!config.autoMs) return;
    timer = setInterval(next, config.autoMs);
  }

  function restartAuto() {
    if (!config.autoMs) return;
    clearInterval(timer);
    startAuto();
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    restartAuto();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    restartAuto();
  });

  renderDots();
  goTo(0);
  startAuto();
}

const galleryData = {
  2025: [
    "https://isds.ctu.edu.vn/2026/images/2025/10/20/img_0054.jpg",
    "https://isds.ctu.edu.vn/2026/images/2025/10/20/img_9737.jpg",
    "https://isds.ctu.edu.vn/2026/images/2025/10/20/img_9946.jpg",
    "https://isds.ctu.edu.vn/2026/images/2025/10/20/img_9920.jpg"
  ],
  2024: [
    "https://isds.ctu.edu.vn/2026/images/2024/11/13/img_9033.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/11/13/img_8972.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/11/13/img_8998.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/11/13/img_9012.jpg"
  ],
  2023: [
    "https://isds.ctu.edu.vn/2026/images/2024/03/12/img_8323.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/03/12/hnisds2023-141.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/03/12/img_8781.jpg",
    "https://isds.ctu.edu.vn/2026/images/2024/03/12/fb_img_1699775842534.jpg"
  ]
};

function setupYearGallery() {
  const switchWrap = document.getElementById("galleryYearSwitch");
  const title = document.getElementById("galleryYearTitle");
  const track = document.getElementById("galleryTrack");
  const dots = document.getElementById("galleryDots");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  if (!switchWrap || !track || !dots || !title) return;

  let year = "2025";
  let index = 0;
  let timer;

  function renderSlides() {
    track.innerHTML = galleryData[year]
      .map((src, idx) => `<img class="slide ${idx === 0 ? "active" : ""}" src="${src}" alt="ISDS ${year} photo ${idx + 1}" />`)
      .join("");
  }

  function renderDots() {
    dots.innerHTML = "";
    galleryData[year].forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `ISDS ${year} slide ${idx + 1}`);
      dot.addEventListener("click", () => goTo(idx));
      dots.appendChild(dot);
    });
  }

  function goTo(target) {
    const slides = Array.from(track.querySelectorAll(".slide"));
    index = (target + slides.length) % slides.length;
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === index));
    Array.from(dots.children).forEach((dot, idx) => dot.classList.toggle("active", idx === index));
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function renderYear() {
    index = 0;
    title.textContent = `ISDS ${year} Highlights`;
    renderSlides();
    renderDots();
    goTo(0);
    Array.from(switchWrap.querySelectorAll(".year-tab")).forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.year === year);
    });
  }

  function startAuto() {
    timer = setInterval(next, 4000);
  }

  function restartAuto() {
    clearInterval(timer);
    startAuto();
  }

  switchWrap.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const selectedYear = target.dataset.year;
    if (!selectedYear || selectedYear === year) return;
    year = selectedYear;
    renderYear();
    restartAuto();
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    restartAuto();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    restartAuto();
  });

  renderYear();
  startAuto();
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
}

updateCountdown();
setInterval(updateCountdown, 1000);
createStaticCarousel({
  trackId: "bannerTrack",
  prevId: "bannerPrev",
  nextId: "bannerNext",
  dotsId: "bannerDots",
  autoMs: 8000
});
setupYearGallery();
setupReveal();
