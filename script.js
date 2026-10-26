// KOLHOZ GANG® — small interactions. Replace placeholder social links below.
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".topbar nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

const filters = document.querySelectorAll(".filter");
const frames = document.querySelectorAll(".gallery .frame[data-category]");
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === button));
  const category = button.dataset.filter;
  frames.forEach(frame => {
    frame.hidden = category !== "all" && frame.dataset.category !== category;
  });
}));

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxTitle = lightbox.querySelector(".lightbox-caption span");
const closeButton = lightbox.querySelector(".lightbox-close");
frames.forEach(frame => {
  const openFrame = () => {
    const img = frame.querySelector(".frame-image img");
    if (!img) return;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = frame.querySelector("h3")?.textContent || "KOLHOZ GANG ARCHIVE";
    lightbox.showModal();
  };
  frame.addEventListener("click", openFrame);
  frame.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFrame();
    }
  });
});
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.open) lightbox.close();
});

const toast = document.querySelector(".toast");
let toastTimeout;
document.querySelectorAll("[data-placeholder='true']").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    toast.textContent = "Add your real profile URL in script.js / index.html first.";
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
  });
});

// Replace the href values in index.html with your real social profile URLs before launch.
