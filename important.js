

const buttonDay = document.createElement('select')
buttonDay.setAttribute('class', 'note__form__select')

const buttonMonth = document.createElement('select')
buttonMonth.setAttribute('class', 'note__form__select')

const buttonYear = document.createElement('select')
buttonYear.setAttribute('class', 'note__form__select')

let year, month, day

containerDate.onchange = () => {
  year = buttonYear.options[buttonYear.selectedIndex].text
  month = buttonMonth.options[buttonMonth.selectedIndex].text
  day = buttonDay.options[buttonDay.selectedIndex].text

  let itsLeapYear = leapYear(year)
  if(itsLeapYear && (month == 2)) {
    // Es febrero en año bisiesto 29 dias
    daysDependingOnTheDate(29)
  } else if(month == 2){
    // Es febrero 28 dias
    daysDependingOnTheDate(28)
  } else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    // Mes con 31  dias
    daysDependingOnTheDate(31)
  } else {
    // Mes con 30 dias
    daysDependingOnTheDate(30)
  }

  console.log(`${day}/${month}/${year}`)
}

// Years
for(i = 2021; i <= 2025; i++) {
  let option = document.createElement('option')
  option.setAttribute('value', i)
  option.textContent = i
  buttonYear.appendChild(option)
}

// Months
for(let i = 1; i <= 12; i++) {
  let option = document.createElement('option')
  option.setAttribute('value', (i < 10) ? `0${i}` : i)
  option.textContent = (i < 10) ? `0${i}` : i
  buttonMonth.appendChild(option)
}

// Days
function daysDependingOnTheDate(days) {
  buttonDay.textContent = ''
  for(let i = 1; i <= days; i++) {
    let option = document.createElement('option')
    option.setAttribute('value', (i < 10) ? `0${i}` : i)
    option.textContent = (i < 10) ? `0${i}` : i
    buttonDay.appendChild(option)
  }
}
daysDependingOnTheDate(30)

containerDate.setAttribute('class', 'container__select')
containerDate.appendChild(buttonDay)
containerDate.appendChild(buttonMonth)
containerDate.appendChild(buttonYear)
form.appendChild(containerDate)
