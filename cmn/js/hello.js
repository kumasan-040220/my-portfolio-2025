const click = document.querySelector(".click");

click.addEventListener("click", () => {
  click.classList.toggle("clicked");
});

const mouseover = document.querySelector(".mouseover");

mouseover.addEventListener("mouseover", () => {
  mouseover.classList.add("mouseovered");
});

mouseover.addEventListener("mouseout", () => {
  mouseover.classList.remove("mouseovered");
});

document.addEventListener("DOMContentLoaded", () => {
  const keydownLi = document.querySelector(".keydown");
  const keyupLi = document.querySelector(".keyup");

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      keydownLi.classList.add("active"); // 押している間、keydown要素に色を付ける
      keyupLi.classList.remove("active"); // 離した要素の色は消す
      e.preventDefault();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      keydownLi.classList.remove("active"); // 押すのをやめたらkeydown要素の色を戻す
      keyupLi.classList.add("active"); // 離したときkeyup要素に色を付ける
      e.preventDefault();
    }
  });
});
