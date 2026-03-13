let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

/* ================================
   BACKGROUND SHAPE MOVEMENT
================================ */

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const direction = isOdd ? -1 : 1;

    shapes[i].style.transform = `translate(${x * direction}px, ${y * direction}px) rotate(${x * direction * 10}deg)`;
  }
}

/* ================================
   DARK MODE
================================ */

function toggleContrast() {
  contrastToggle = !contrastToggle;
  document.body.classList.toggle("dark-theme", contrastToggle);
}

/* ================================
   MODAL
================================ */

function toggleModal() {
  isModalOpen = !isModalOpen;
  document.body.classList.toggle("modal--open", isModalOpen);
}

/* ================================
   CONTACT FORM (EMAILJS)
================================ */

function contact(event) {
  event.preventDefault();

  const loadingOverlay = document.querySelector(".modal__overlay--loading");
  const successOverlay = document.querySelector(".modal__overlay--success");
  const submitButton = document.getElementById("contact__submit");
  const form = event.target;

  if (!loadingOverlay || !successOverlay || !submitButton || !form) {
    alert("Missing form elements.");
    return;
  }

  submitButton.disabled = true;
  successOverlay.classList.remove("modal__overlay--visible");
  loadingOverlay.classList.add("modal__overlay--visible");

  emailjs
    .sendForm("service_4u7lwdk", "template_clxjvmm", form, {
      publicKey: "H-Iqb4hSEcgEgH_gT",
    })
    .then(() => {
      console.log("Email successfully sent via EmailJS");

      loadingOverlay.classList.remove("modal__overlay--visible");
      successOverlay.classList.add("modal__overlay--visible");
      form.reset();
      submitButton.disabled = false;

      setTimeout(() => {
        if (isModalOpen) {
          toggleModal();
        }

        successOverlay.classList.remove("modal__overlay--visible");
      }, 2500);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);

      loadingOverlay.classList.remove("modal__overlay--visible");
      submitButton.disabled = false;

      alert("Email failed. Please try again.");
    });
}

/* ================================
   SCROLL REVEAL
================================ */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) {
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* ================================
   EVENT LISTENERS
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const landingPage = document.getElementById("landing-page");

  if (landingPage) {
    landingPage.addEventListener("mousemove", moveBackground);
  }

  initScrollReveal();
});