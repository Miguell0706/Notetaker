//CODE FOR TIME GOES HERE// 
const exampleTimePickable = document.querySelector(".time");
const due_date_container = document.querySelector(".due-date");


function clearTime() {
  if (exampleTimePickable.value) {
      exampleTimePickable.value = ''
  }
  return
}
function activate() {
  let activePicker = null;
  document.querySelectorAll(".time").forEach((time) => {
    time.addEventListener("focus", () => {
      if (activePicker) return;
      activePicker = showPicker(time);
      const onClickAway = ({ target }) => {
        if (
          target === activePicker ||
          target === time ||
          activePicker.contains(target)
        ) {
          return;
        }
        due_date_container.removeChild(activePicker);
        activePicker = null;
        document.removeEventListener("mousedown", onClickAway);
        };
      document.addEventListener("mousedown", onClickAway);
    });
  });
}
function showPicker(timePickable) {
  const picker = buildPicker(timePickable);
  due_date_container.appendChild(picker);
  return picker;
}
function buildPicker(timePickable) {
  const picker = document.createElement("div");
  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
    numberToOption
  );
  const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
    numberToOption
  );

  picker.innerHTML = `
    <select class='time-picker-select'>
      ${hourOptions.join("")}
    </select>
    :
    <select class='time-picker-select'>
      ${minuteOptions.join("")}
    </select>
    <select class='time-picker-select'>
      <option value="am">am</option>
      <option value="pm">pm</option>
    </select>
  `;
  const selects = getSelectsFromPicker(picker);

  selects.hour.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );
  selects.minutes.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );
  selects.meridiem.addEventListener(
    "change",
    () => (timePickable.value = getTimeStringFromPicker(picker))
  );

  if (timePickable.value) {
    const { hour, minute, meridiem } = getTimePartsFromPickable(timePickable);
    selects.hour.value = hour;
    selects.minutes.value = minute;
    selects.meridiem.value = meridiem;
  }

  return picker;
}
function getTimePartsFromPickable(timePickable) {
  const pattern = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)/;
  const matchResult = timePickable.value.match(pattern);
  
  // Check if matchResult is not null before destructuring
  if (matchResult !== null) {
    const [_, hour, minute, meridiem] = matchResult;
    return { hour, minute, meridiem };
  } else {
    // Handle the case where there's no match
    return null;
  }
}
function getSelectsFromPicker(timePicker) {
  const [hour, minutes, meridiem] = timePicker.querySelectorAll(
    ".time-picker-select"
  );

  return {
    hour,
    minutes,
    meridiem,
  };
}
function getTimeStringFromPicker(timePicker) {
  const selects = getSelectsFromPicker(timePicker);
  return `${selects.hour.value}:${selects.minutes.value}${selects.meridiem.value}`;
}
function numberToOption(number) {
  const padded = number.toString().padStart(2, "0");

  return `<option value="${padded}">${padded}</option>`;
}

activate();

// CODE FOR DATE GOES HERE!//
const date_input= document.querySelector(".date");

const date = new Date();
let current_month = date.getMonth();
let current_year = date.getFullYear();
let current_day = '';
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = document.querySelector(".days");
const year = document.querySelector(".year");
const month = document.querySelector(".month");
const day_heading = document.querySelector(".day");
const input_date = document.querySelector('.date')
const calender = document.querySelector('.calender-container')
function clearDate() {
  date_input.value=''
}
function createMonth() {
  month.innerHTML = months[current_month];
  year.innerHTML = current_year;
  days_in_month = new Date(current_year, current_month + 1, 0).getDate();
  day_of_week = new Date(current_year, current_month, 1).getDay();
  days_in_prev_month = new Date(current_year, current_month, 0).getDate();
  last_day_weekday = new Date(current_year, current_month + 1, 0).getDay();

  let days_string = ""; 
  for (let i = 0; i < day_of_week; i++) {
    days_string += `<div class="prev-month">${days_in_prev_month - i}</div>`;
  }
  for (let i = 1; i <= days_in_month; i++) {
    days_string += `<div class="day">${i}</div>`;
  }
  for (let i = 1; i <= 6-last_day_weekday; i++) { 
    days_string += `<div class="next-month">${i}</div>`;

}
  days.innerHTML = days_string;

  /*add event listener to all divs inside the days element to set the dayheading to the date selected*/
  days.querySelectorAll(".day").forEach(day => {
    day.addEventListener("click", () => {
      day_heading.innerHTML = day.innerHTML+',';
      current_day = day.innerHTML;
      date_input.value = `${current_month+1}/${current_day}/${current_year}`;
      closeCalender();
    })
  })
}
function openCalender() {
  calender.style.display = 'inline-block';
  /*add event listener to close calender whenever theres a click outside the calender*/ 
  const onClickAway = ({ target }) => {
    if (!calender.contains(target) && target !== date_input) {
      document.removeEventListener("mousedown", onClickAway)
      closeCalender();
    }
  };
  document.addEventListener("mousedown", onClickAway);
}
function closeCalender() {
  calender.style.display = 'none';
}
function nextMonth() {
  if (current_month === 11) {
    current_month = 0;
    current_year++;
  }
  else {
    current_month++;
  }
  createMonth();

}
function prevMonth() {
  if (current_month === 0) {
    current_month = 11;
    current_year--;
  }
  else {
    current_month--;
  }
  createMonth();
}
createMonth();

