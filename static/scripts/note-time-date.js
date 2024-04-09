//CODE FOR TIME GOES HERE// 
const exampleTimePickable = document.querySelector(".time");
const due_date_container = document.querySelector(".due-date");
function activate() {
  let activePicker = null;
  document.querySelectorAll(".time").forEach((time) => {
    time.addEventListener("focus", () => {
      if (activePicker) return;
      activePicker = showPicker(time);
      const onClickAway = ({ target }) => {
        console.log('clicked away')
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
  const pattern = /^(\d+):(\d+)(am|pm)$/;
  console.log(timePickable.value)
  const matchResult = timePickable.value.match(pattern);
  
  // Check if matchResult is not null before destructuring
  if (matchResult !== null) {
    const [_, hour, minute, meridiem] = matchResult;
    console.log(hour, minute, meridiem);
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

