const darkModeCheckbox = document.getElementById("dark-mode");
const bodyElement = document.body;
const profile_dropdown = document.querySelector(".profile-dropdown");
const menu_container = document.querySelector(".menu-container");

darkModeCheckbox.addEventListener("change", function () {
  bodyElement.classList.toggle(
    "body-dark-mode",
    darkModeCheckbox.checked
  );
});
function displayProfile() {
  if (profile_dropdown.style.display === "none") {
    profile_dropdown.style.display = "flex";
  } else {
    profile_dropdown.style.display = "none";
  }
}
function displayMenu() {
  menu_container.classList.toggle('opened')
}