document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("modal-placeholder");
  const modalUrl = "cmn/html/modal.html";

  fetch(modalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      placeholder.innerHTML = data;
      initializeModal();
    })
    .catch((error) => {
      console.error("Error loading modal section:", error);
      placeholder.innerHTML =
        "<p>modalセクションの読み込みに失敗しました。</p>";
    });
});

function initializeModal() {
  const contactLink = document.querySelector('a[href="#contact"]');
  const contactTrigger = document.querySelector(".contact-trigger");
  const contactForm = document.querySelector(".contact-form");
  const contactOverlay = document.querySelector(".contact-overlay");
  const closeButton = document.querySelector(".close-button");

  function openModal() {
    contactForm.classList.add("active");
    contactOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    contactForm.classList.remove("active");
    contactOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  if (contactTrigger) {
    contactTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (contactOverlay) {
    contactOverlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}
