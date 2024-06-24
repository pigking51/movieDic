$(document).ready(function () {
  $(".FAQ-wrap > ul").click(function () {
    $(this).next(".Answer").stop().slideToggle(500);
  });
});
