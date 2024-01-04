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
  profile_dropdown.classList.toggle('opened')
}
function displayMenu() {
  menu_container.classList.toggle('opened')
}