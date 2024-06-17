document.querySelector(".myclass").addEventListener("click", () => {
  document.querySelector(".user-data").style.display = "block";
  document.querySelector(".userInfo").style.display = "none";
});

document.querySelector(".userEdit").addEventListener("click", () => {
  document.querySelector(".userInfo").style.display = "block";
  document.querySelector(".user-data").style.display = "none";
});
