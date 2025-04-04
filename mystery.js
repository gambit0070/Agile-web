document.addEventListener("DOMContentLoaded", function() {
  const modeToggle = document.getElementById("modeToggle");
  if (localStorage.getItem("mode") === "light") {
    document.body.classList.add("light-mode");
    modeToggle.checked = true;
  }
  modeToggle.addEventListener("change", function() {
    if (modeToggle.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("mode", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("mode", "dark");
    }
  });
});