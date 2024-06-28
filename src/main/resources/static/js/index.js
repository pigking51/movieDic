// 처음 인삿말 애니메이션
const introText = document.querySelectorAll("span");

window.onload = () => {
  let timer = 100;
  introText.forEach((item) => {
    item.style.animation = `fade 500ms ${(timer += 50)}ms forwards`;
  });
};

// 중간 내용
$(document).ready(function () {
  $(window).scroll(function () {
    $(".mid-info").each(function (i) {
      let bottom_of_element = $(this).offset().top + $(this).outerHeight() / 2;
      let bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_element) {
        $(this).animate({ opacity: "1" }, 1000);
      }
    });
  });
});
