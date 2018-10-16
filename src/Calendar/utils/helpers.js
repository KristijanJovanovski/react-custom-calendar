import { days, months } from './constants'

export const checkDate = date => {
  if (date instanceof Date) {
    return
  }
  throw new Error('Not a date')
}

export const getMonthsArray = (locale = 'en') => {
  const monthsArray = Object.keys(months[locale])
    .sort((a, b) => a - b)
    .reduce((prev, curr) => [...prev, months[locale][curr]], [])
  return monthsArray
}

export const transformWeekDays = (locale, calendarType = 'ISO 8601') => {
  if (calendarType === 'ISO 8601') {
    let newDays = Object.keys(days[locale])
      .map(type => ({
        [type]: [...days[locale][type].slice(1), days[locale][type][0]]
      }))
      .reduce((prev, curr) => ({ ...prev, ...curr }))
    return newDays
  }
  if (calendarType === 'US') {
    let newDays = Object.keys(days[locale])
      .map(type => ({
        [type]: [...days[locale][type]]
      }))
      .reduce((prev, curr) => ({ ...prev, ...curr }))
    return newDays
  }
}

export const getMonthAndYear = (date, locale = 'en') => {
  checkDate(date)
  const month = getMonth(date, locale)
  const year = getYear(date)
  return `${month} ${year}`
}

export const getYear = date => {
  checkDate(date)
  return date.getFullYear()
}

export const getMonth = (date, locale = 'en') => {
  checkDate(date)
  return months[locale][date.getMonth() + 1]
}

export const getPrevDate = (date, type) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case 'Month':
      newDate = new Date(date.getFullYear(), date.getMonth() - 1)
      break
    case 'Year':
      newDate = new Date(date.getFullYear() - 1, date.getMonth())
      break

    default:
      break
  }
  return newDate
}

export const getNextDate = (date, type) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case 'Month':
      newDate = new Date(date.getFullYear(), date.getMonth() + 1)
      break
    case 'Year':
      newDate = new Date(date.getFullYear() + 1, date.getMonth())
      break

    default:
      break
  }
  return newDate
}

export const getDoublePrevDate = (date, type) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case 'Month':
      newDate = new Date(date.getFullYear() - 1, date.getMonth())
      break
    case 'Year':
      newDate = new Date(date.getFullYear() - 10, date.getMonth())
      break

    default:
      break
  }
  return newDate
}

export const getDoubleNextDate = (date, type) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case 'Month':
      newDate = new Date(date.getFullYear() + 1, date.getMonth())
      break
    case 'Year':
      newDate = new Date(date.getFullYear() + 10, date.getMonth())
      break

    default:
      break
  }
  return newDate
}

export const getNewDate = (date, type, idx) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case 'Date':
      newDate = new Date(date.getFullYear(), date.getMonth(), idx)
      break
    case 'Month':
      newDate = new Date(date.getFullYear(), idx)
      break

    default:
      break
  }
  return newDate
}

export const getMonthViewDates = (date, type = 'ISO 8601') => {
  checkDate(date)
  let viewDates = []
  const month = date.getMonth()
  const year = date.getFullYear()
  const currMonthStartDateObj = new Date(year, month, 1)
  const currMonthEndDateObj = new Date(year, month + 1, 0)
  const firstDay = currMonthStartDateObj.getDay()
  const lastDay = currMonthEndDateObj.getDay()
  const lastDate = currMonthEndDateObj.getDate()
  const prevMonthEndDateObj = new Date(year, month, 0)

  const prevMonthEndLastDate = prevMonthEndDateObj.getDate()

  switch (type) {
    case 'ISO 8601':
      const isoFirstDay = (firstDay + 6) % 7
      if (isoFirstDay !== 0) {
        const prevMonthStartLastDates = prevMonthEndLastDate - isoFirstDay + 1
        viewDates = Array(isoFirstDay)
          .fill()
          .map((item, idx) => idx + prevMonthStartLastDates)
          .reduce((prev, curr) => [...prev, curr], viewDates)
      }
      viewDates = Array(lastDate)
        .fill()
        .map((item, idx) => idx + 1)
        .reduce((prev, curr) => [...prev, curr], viewDates)

      viewDates = Array((6 - lastDay + 1) % 7)
        .fill()
        .map((item, idx) => idx + 1)
        .reduce((prev, curr) => [...prev, curr], viewDates)
      break

    case 'US':
      if (firstDay !== 0) {
        const prevMonthStartLastDates = prevMonthEndLastDate - firstDay + 1
        viewDates = Array(firstDay)
          .fill()
          .map((item, idx) => idx + prevMonthStartLastDates)
          .reduce((prev, curr) => [...prev, curr], viewDates)
      }
      viewDates = Array(lastDate)
        .fill()
        .map((item, idx) => idx + 1)
        .reduce((prev, curr) => [...prev, curr], viewDates)

      viewDates = Array((6 - lastDay) % 7)
        .fill()
        .map((item, idx) => idx + 1)
        .reduce((prev, curr) => [...prev, curr], viewDates)

      break

    default:
      break
  }
  return viewDates
}
