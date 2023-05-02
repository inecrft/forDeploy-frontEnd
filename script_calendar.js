const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = `<h3>${months[month] + " " + year}</h3>`;

  let days = "";
  //add blank prev date
  for (let i = day; i > 0; i--) {
    days += `<div class="day prev-date"><div class="dot">${prevDays-i+1}</div></div>`;
  }
  //add days of that month
  for (let i = 1; i <= lastDate; i++) {
    let hasReminder = false;
    for (let j = 0; j < remindersData.length; j++) {
      let reminderDate = remindersData[j].reminder_date;
      let ymd = reminderDate.split("-");
      let int_ymd = ymd.map((date_string) => {
        return parseInt(date_string);
      });
      if (int_ymd[0] == year && int_ymd[1] == month + 1 && int_ymd[2] == i) {
        hasReminder = true;
        break;
      }
    }

    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
    ) {
      if (hasReminder) {
        days += `<div class="day today hasReminder"><div class="dot">${i}</div></div>`;
      } else {
        days += `<div class="day", id="today"><div class="dot">${i}</div></div>`;
      }
    } else {
      if (hasReminder) {
        days += `<div class="day hasReminder"><div class="dot">${i}</div></div>`;
      } else {
        days += `<div class="day"><div class="dot">${i}</div></div>`;
      }
    }
  }
  //add blank next date
  for (let i = 1; i <= nextDays; i++) {
    days += `<div class="day next-date"><div class="dot">${i}</div></div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
}

initCalendar();

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
