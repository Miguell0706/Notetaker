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
const folders_arrow = document.querySelector('.folders-arrow');
const folder_pinned_notes = document.querySelector('.folder-pinned-notes');
const folder_recent_notes = document.querySelector('.folder-recent-notes');
const note_container = document.querySelector('.note-container');
const note_folder_arrow = document.querySelector('.note-folder-arrow');
const note_folder_select= document.querySelector('.note-folder-select')
const selected_folder_display = document.querySelector('.selected-folder-display');
const cancel_note = document.querySelector('.note-cancel');
const small_note = document.querySelectorAll('.small-note');

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
function switchFolderNotes(x) {
  if (x === 1) {
    folder_recent_notes.style.display = 'flex';
    folder_pinned_notes.style.display = 'none';
  }
  else if  (x === 2) {
    folder_pinned_notes.style.display = 'flex';
    folder_recent_notes.style.display = 'none';
  }
}
function openNote(){
  const note_container = document.querySelector('.note-container');
  if (!note_container.classList.contains('opened')) {
      note_container.classList.add('opened');
  }
}
function updateSelectedFolder() {
  // Get the selected option
  var selectedOption = note_folder_select.options[note_folder_select.selectedIndex];
  // Get the selected value
  var selectedValue = selectedOption.textContent;
  // Update the content of the paragraph element
  selected_folder_display.textContent = selectedValue;
}
function flipArrow(){
  note_folder_arrow.classList.toggle('flip')
  
}
function closeNote(){
  const note_container = document.querySelector('.note-container');
  if (note_container.classList.contains('opened')) {
      note_container.classList.remove('opened');
  }
  clearNoteData();
}
//CODE FOR SUBMISSION VERIFICATION GOES HERE (THERE IS MORE IN VIEWS)//
//write code that gives an error when a note tries to be submitted that has a time value but no date value, it would then prevent the form submission it should still the possibility for a date value but no time value//
const noteForm = document.querySelector(".note-form");

noteForm.addEventListener("submit", function(event) {
  if (exampleTimePickable.value && !input_date.value) {
    alert("Error: A note cannot have a time value without a date value.");
    event.preventDefault(); // Prevent form submission
  }
});
//CODE FOR VIEWING AND UPDATING AN EXISTING NOTE GOES HERE//
small_note.forEach(container => {
  container.addEventListener('click', function() {
      // Get the note ID from the container's data attribute or any other appropriate source
      const noteId = this.dataset.noteId; // Assuming you have a data attribute named "data-note-id" on each note container

      // Fetch note details
      fetch('/get_note/' + noteId + '/')
          .then(response => response.json())
          .then(data => {
              // Process the received data
              // For example, update the modal with the note details
              updateNoteWithData(data);
          })
          .catch(error => {
              console.error('Error fetching note details:', error);
          });
  });
});

// Function to update note and open with note details
function updateNoteWithData(data) {
  // Update the modal with the note details
  document.querySelector(".note-title").value = data.title;
  document.querySelector(".note-pin").value = data.pinned;
  document.querySelector(".note-text").value = data.text;
  document.querySelector(".time").value = data.due_time;
  document.querySelector(".date").value = data.due_date;
  document.querySelector(".folder").value = data.folder;
  // Open the modal
  openNote();
}
function clearNoteData() {
  console.log('clearking note data');
  document.querySelector(".note-title").value = '';
  document.querySelector(".note-pin").checked = false;
  document.querySelector(".note-text").value = '';  
  document.querySelector(".time").value = '';
  document.querySelector(".date").value = '';
  note_folder_select.options[0].selected = true;// Set to the first option (assuming it's the default option)
  updateSelectedFolder();
  // Update the selected folder display
}