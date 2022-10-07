const admin = document.querySelector(".admin");
const hamburger = document.querySelector(".hamburger-menu");
const mainNavActions = document.querySelector(".main-nav-actions");
const mainNavLinks = document.querySelector(".main-nav-links");

admin.addEventListener("click", () => {
  admin.classList.toggle("active");
  mainNavActions.classList.toggle("active");
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mainNavLinks.classList.toggle("active");
  console.log(hamburger, mainNavLinks);
});
