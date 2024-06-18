document.querySelector(".myclass").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "block";
  document.querySelector(".user-modify").style.display = "none";
});

document.querySelector(".userEdit").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "none";
  document.querySelector(".user-modify").style.display = "block";
});
