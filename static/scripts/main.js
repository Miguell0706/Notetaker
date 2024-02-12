const darkModeCheckbox = document.getElementById("dark-mode");
const bodyElement = document.body;
const profile_dropdown = document.querySelector(".profile-dropdown");
const menu_container = document.querySelector(".menu-container");
const menu_links = document.querySelectorAll(".menu-links");
const menu_icon = document.querySelector(".menu-icon");
const profile_icon = document.querySelector(".profile-icon");
const create_note_button = document.querySelector(".create-note-button");
const urgent_icon = document.querySelector('.urgent-icon');
const folders_container = document.querySelector('.folders-container');
const folders_arrow = document.querySelector('.folders-arrow')

/*This code is for setting up all the class changes for dark mode */
darkModeCheckbox.addEventListener("change", function () {
  // Toggle dark mode class on the body
  bodyElement.classList.toggle("body-dark-mode", darkModeCheckbox.checked);

  // Toggle dark mode class on the menu container
  menu_container.classList.toggle("menu-container-dark", darkModeCheckbox.checked);
  //Toggledark mode class on the profile dropdown
  profile_dropdown.classList.toggle("profile-dropdown-dark", darkModeCheckbox.checked);

  // Toggle dark mode class on the create note button
  create_note_button.classList.toggle("create-note-button-dark", darkModeCheckbox.checked);
});
/*This code is for seeting up the dropdown menus in the nav bar for small screens */
/* This code is for setting up listeners for when the user clicks outside of any open menus causing them to close*/
window.addEventListener('click', function (event) {
  if (!profile_dropdown.contains(event.target) && profile_dropdown.classList.contains('opened')) {
    profile_dropdown.classList.remove('opened');
    profile_icon.classList.remove('active')
  }

  if (!menu_container.contains(event.target) && (menu_container.classList.contains('opened'))) {
    menu_container.classList.remove('opened');
    menu_icon.classList.remove('active')
  }
});
function displayProfile() {
  if (!profile_dropdown.classList.contains('opened'))  {
    setTimeout(() => profile_dropdown.classList.add('opened'), 50);
    profile_icon.classList.add('active')
  }
  else {
    profile_dropdown.classList.remove('opened');
    profile_icon.classList.remove('active')
  }
}
function displayMenu() {
  if (!menu_container.classList.contains('opened'))  {
    setTimeout(() => menu_container.classList.add('opened'), 50);
    menu_icon.classList.add('active')
  }
  else {
    menu_container.classList.remove('opened');
    menu_icon.classList.remove('active')
  }
}
/* Code to hide urgent icon on click*/
function removeUrgentIcon(){
  urgent_icon.style.display = 'none';
}
/* This code is for setting up the active class in the nav bar when the user enters a link*/
document.addEventListener('DOMContentLoaded', function() {
  console.log(window.location.href)
  menu_links.forEach(function(menu_links) {
    if (menu_links.href === window.location.href) {
      menu_links.classList.add('active');
    }
  });
});
function hideFolders() {
  folders_container.classList.toggle('closed')
  if (folders_arrow.style.transform === 'rotate(0deg)') {
    folders_arrow.style.transform = 'rotate(180deg)';
    
  }
  else {
    folders_arrow.style.transform = 'rotate(0deg)';
  }
}