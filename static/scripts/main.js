const darkModeCheckbox = document.getElementById("dark-mode");
const bodyElement = document.body;
const profile_dropdown = document.querySelector(".profile-dropdown");
const menu_container = document.querySelector(".menu-container");

/*This code is for setting up all the class changes for dark mode */
darkModeCheckbox.addEventListener("change", function () {
  bodyElement.classList.toggle(
    "body-dark-mode",
    darkModeCheckbox.checked
  );
});
/*This code is for seeting up the dropdown menus in the nav bar for small screens */
window.addEventListener('click', function (event) {
  console.log('meow')
  if (!profile_dropdown.contains(event.target) && profile_dropdown.classList.contains('opened')) {
    console.log('meow1profile')
    profile_dropdown.classList.remove('opened');
  }

  if (!menu_container.contains(event.target) && (menu_container.classList.contains('opened'))) {
    console.log('meowmenu')
    menu_container.classList.remove('opened');
  }
});
function displayProfile() {
  if (!profile_dropdown.classList.contains('opened'))  {
    setTimeout(() => profile_dropdown.classList.add('opened'), 50);
  }
  else {
    profile_dropdown.classList.remove('opened');
  }
}
function displayMenu() {
  if (!menu_container.classList.contains('opened'))  {
    setTimeout(() => menu_container.classList.add('opened'), 50);
  }
  else {
    menu_container.classList.remove('opened');
  }
}