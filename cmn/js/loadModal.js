document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("modal-placeholder");
  const modalUrl = "cmn/html/modal.html"; // 外部HTMLファイルのパス

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

  // モーダルを開く関数
  function openModal() {
    contactForm.classList.add("active");
    contactOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  // モーダルを閉じる関数
  function closeModal() {
    contactForm.classList.remove("active");
    contactOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  // Contactリンクをクリックした時の処理
  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  // フッターのメールアイコンをクリックした時の処理
  if (contactTrigger) {
    contactTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  // 閉じるボタンをクリックした時の処理
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // オーバーレイをクリックした時の処理
  if (contactOverlay) {
    contactOverlay.addEventListener("click", closeModal);
  }

  // ESCキーを押した時の処理
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}
