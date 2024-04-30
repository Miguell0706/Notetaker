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
const noteForm = document.querySelector(".note-form");
const create_or_update_note = document.querySelector(".note-save");
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

noteForm.addEventListener("submit", function(event) {
  if (exampleTimePickable.value && !input_date.value) {
    alert("Error: A note cannot have a time value without a date value.");
    event.preventDefault(); // Prevent form submission
    return
  }
  if (create_or_update_note.value === "Create Note") {
    createNote();
    event.preventDefault(); // Prevent form submission
  }
  else if (create_or_update_note.value === "Update Note") {
    updateNote();
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
  // Update the modal with the note 
  document.querySelector(".note-title").value = data.title;
  document.querySelector(".note-pin").checked = data.pinned;
  document.querySelector(".note-text").value = data.text;
  if (data.due_time) {
    document.querySelector(".time").value = convertToTimeInputFormat(data.due_time);
  }
  if (data.due_date) {
    document.querySelector(".date").value = convertDateToInputFormat(data.due_date);
  }
  if (data.folder) {
    document.querySelector(".selected-folder-display").textContent = data.folder;
    //loop through all options of note_folder_select and select the one that matches the folder name//
    for(let option of note_folder_select.options) {
      if (option.textContent === data.folder) {
        option.selected = true;
        break;
      }
    }
  }
  create_or_update_note.value = "Update Note";
  noteId = data.id;
  openNote();
}
function clearNoteData() {
  create_or_update_note.value = "Create Note";
  document.querySelector(".note-title").value = '';
  document.querySelector(".note-pin").checked = false;
  document.querySelector(".note-text").value = '';  
  document.querySelector(".time").value = '';
  document.querySelector(".date").value = '';
  note_folder_select.options[0].selected = true;// Set to the first option (assuming it's the default option)
  updateSelectedFolder();
  // Update the selected folder display
}
function convertDateToInputFormat(dateString) {
const originalDateString = dateString;
const [year, month, day] = originalDateString.split("-");
const date = new Date(year, month - 1, day);
const formattedMonth = String(date.getMonth() + 1);
const formattedDay = String(date.getDate());
const formattedDateString = `${formattedMonth}/${formattedDay}/${year}`;
return formattedDateString;
}
function convertToTimeInputFormat(timeString) {
  // Original time string in the format 'HH:mm:ss'
  var originalTimeStr = timeString;

  // Parse the time string into a Date object
  var timeObj = new Date('1970-01-01T' + originalTimeStr);

  // Get hours and minutes separately
  var hours = timeObj.getHours();
  var minutes = timeObj.getMinutes();

  // Determine AM/PM
  var meridiem = hours >= 12 ? 'pm' : 'am';

  // Adjust hours for 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12;
  var formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + meridiem;
  console.log(formattedTime); 
  return formattedTime;
}
//CODE FOR CREATING A NEW NOTE ajax request goes
function createNote() {
  const csrftoken = getCookie('csrftoken');
  fetch('create_note', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'title': document.querySelector('.note-title').value,
      'text': document.querySelector('.note-text').value,
      'due_date': document.querySelector('.date').value,
      'due_time': document.querySelector('.time').value,
      'pinned': document.querySelector('.note-pin').checked,
      'folder': document.querySelector('.note-folder-select').value
    }),
  })
  closeNote();
}
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}
function updateNote() {
  
  const csrftoken = getCookie('csrftoken');
  fetch('update_note/' + noteId + '/', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'title': document.querySelector('.note-title').value,
      'text': document.querySelector('.note-text').value,
      'due_date': document.querySelector('.date').value,
      'due_time': document.querySelector('.time').value,
      'pinned': document.querySelector('.note-pin').checked,
      'folder': document.querySelector('.note-folder-select').value
    }),
  })
  closeNote();
}
