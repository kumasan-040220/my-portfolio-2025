document.querySelector(".box").addEventListener("click", function () {
  this.classList.add("shrink");
});

// トップに戻るボタンの制御
document.addEventListener("DOMContentLoaded", function () {
  const toTopButton = document.getElementById("to-top-button");

  // スクロールイベントの監視
  window.addEventListener("scroll", function () {
    // 現在のスクロール位置を取得
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // スクロール位置が100px以上ならボタンを表示、それ以外なら非表示
    if (scrollPosition > 100) {
      toTopButton.classList.add("show");
    } else {
      toTopButton.classList.remove("show");
    }
  });

  // ボタンクリック時のスムーズスクロール（オプション）
  toTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ヘッダーのページ内リンクをスムーズスクロールさせる
  const headerLinks = document.querySelectorAll("#header a[href^='#']");

  headerLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // ヘッダーの高さを考慮したスクロール位置の調整
        const headerHeight = document.querySelector("#header").offsetHeight;
        // スクロール位置の微調整のための追加オフセット（必要に応じて調整）
        const additionalOffset = -45;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          additionalOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
