// Mobile menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark / Light theme toggle
const toggles = [];
function initThemeToggle() {
  const toggleDesktop = document.getElementById("theme-toggle");
  const toggleMobile = document.getElementById("theme-toggle-m");
  if (toggleDesktop) toggles.push(toggleDesktop);
  if (toggleMobile) toggles.push(toggleMobile);

  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
    });
  });
}

// Scroll reveal
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal, .details-card, .contact-card");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transform = "translateY(0)";
        e.target.style.opacity = "1";
        e.target.style.transition = "opacity .6s ease, transform .6s ease";
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    io.observe(el);
  });
}

// Footer year
function injectYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// WhatsApp form handler
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initRevealOnScroll();
  injectYear();

  const waForm = document.getElementById("whatsapp-form");
  if (waForm) {
    waForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("wa-name").value.trim();
      const email = document.getElementById("wa-email").value.trim();
      const phone = document.getElementById("wa-phone") ? document.getElementById("wa-phone").value.trim() : "";
      const subject = document.getElementById("wa-subject") ? document.getElementById("wa-subject").value.trim() : "";
      const message = document.getElementById("wa-message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const phoneNumber = "27814368094";
      let text = `Name: ${name}%0AEmail: ${email}`;
      if (phone) text += `%0APhone: ${phone}`;
      if (subject) text += `%0ASubject: ${subject}`;
      text += `%0A%0A${message}`;

      window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
    });
  }
});
