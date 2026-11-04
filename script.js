// ===== 1. MOBILE MENU =====
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// menu ke link par click karne par menu band ho jaye
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});


// ===== 2. FAQ ACCORDION =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {
    // pehle baaki sab FAQ band karo
    faqItems.forEach(function (other) {
      if (other !== item) {
        other.classList.remove("active");
      }
    });

    // phir is wale ko open/close karo
    item.classList.toggle("active");
  });
});


// ===== 3. STATISTICS COUNTER =====
const numbers = document.querySelectorAll(".number");

function countUp(element) {
  const target = Number(element.dataset.target);   // HTML ke data-target se number
  const duration = 2000;                           // 2 seconds
  const step = target / (duration / 20);
  let current = 0;

  const timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}

// ginti tab shuru ho jab user stats section tak scroll kare
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      countUp(entry.target);
      observer.unobserve(entry.target);   // sirf ek baar chale
    }
  });
}, { threshold: 0.5 });

numbers.forEach(function (num) {
  observer.observe(num);
});


// ===== 4. CONTACT FORM =====
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();   // page reload hone se rokta hai

  const name = document.querySelector("#name").value;

  formMessage.textContent = "Thank you, " + name + "! We will contact you soon.";
  contactForm.reset();      // form khali kar do
});

// ===== 5. NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ===== 6. SCROLL REVEAL ANIMATION =====
const revealItems = document.querySelectorAll(
  ".card, .step, .partner, .stat, .faq-item, .about-wrap, .contact-wrapper"
);

revealItems.forEach(function (item) {
  item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // animation ke baad class hata do, taaki hover effect sahi chale
      setTimeout(function () {
        entry.target.classList.remove("reveal", "show");
      }, 800);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(function (item) {
  revealObserver.observe(item);
});