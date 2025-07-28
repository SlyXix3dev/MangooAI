// js/main.js

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark-mode", document.body.classList.contains("dark"));
}

window.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("dark-mode") === "true";
  if (darkMode) document.body.classList.add("dark");
});
