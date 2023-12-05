const darkModeCheckbox = document.getElementById("dark-mode");
const bodyElement = document.body;
const nav_dropdown = document.querySelector(".nav-dropdown");

darkModeCheckbox.addEventListener("change", function () {
  bodyElement.classList.toggle(
    "body-dark-mode",
    darkModeCheckbox.checked
  );
});
function displayDropdown() {
  console.log("sdass");
  if (nav_dropdown.style.display === "none") {
    console.log("hello");
    nav_dropdown.style.display = "flex";
  } else {
    nav_dropdown.style.display = "none";
  }
}