export function getCurrentHour() {
  const currentDate = new Date()

  let hours = currentDate.getHours()
  let minutes = currentDate.getMinutes()

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}`
}

export function getCurrentDate() {
  const currentDate = new Date()

  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  if (day < 10) {
    day = `0${day}`
  }
  if (month < 10) {
    month = `0${month}`
  }

  return `${day}-${month}-${year.toString().substring(2)}`
}

export function getNextDate() {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 1)

  const year = currentDate.getFullYear()
  const month = `0${currentDate.getMonth() + 1}`.slice(-2)
  const day = `0${currentDate.getDate()}`.slice(-2)

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export function formattedHour(hour = "") {
  const rebuildHour = hour.split(":")
  return `${rebuildHour[0]}:${rebuildHour[1]}`
}
