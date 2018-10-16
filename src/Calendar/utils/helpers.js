import { days, months } from './constants'

export const checkDate = date => {
  if (date instanceof Date) {
    return
  }
  throw new Error('Not a date')
}
export const checkMinMaxDate = (minDate, maxDate) => {
  checkDate(minDate)
  checkDate(maxDate)
  if (afterDates(minDate, maxDate))
    throw new Error('Min Date cannot be after Max Date')
}

export const equalDates = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export const beforeDates = (first, second) => {
  return (
    first.getFullYear() < second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      (first.getMonth() < second.getMonth() ||
        (first.getMonth() === second.getMonth() &&
          first.getDate() < second.getDate())))
  )
}
export const afterDates = (first, second) => {
  return (
    first.getFullYear() > second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      (first.getMonth() > second.getMonth() ||
        (first.getMonth() === second.getMonth() &&
          first.getDate() > second.getDate())))
  )
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
export const beginingOfMonthDateObj = date => {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month, 1)
}
export const endOfMonthDateObj = date => {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month + 1, 0)
}

export const getMonthViewDates = (date, type = 'ISO 8601') => {
  checkDate(date)
  let viewDates = []
  const month = date.getMonth()
  const year = date.getFullYear()
  const currMonthStartDateObj = beginingOfMonthDateObj(date)
  const currMonthEndDateObj = endOfMonthDateObj(date)
  const firstDay = currMonthStartDateObj.getDay()
  const lastDay = currMonthEndDateObj.getDay()
  const lastDate = currMonthEndDateObj.getDate()
  const prevMonthEndDateObj = new Date(year, month, 0)
  const prevMonthEndLastDate = prevMonthEndDateObj.getDate()
  const nextMonthStartDateObj = new Date(year, month + 1, 1)

  let trailingDays, prependDays

  if (type === 'ISO 8601') {
    trailingDays = (6 - lastDay + 1) % 7
    prependDays = (firstDay + 6) % 7
  }

  if (type === 'US') {
    prependDays = firstDay
    trailingDays = (6 - lastDay) % 7
  }
  if (prependDays !== 0) {
    const prevMonthStartLastDates = prevMonthEndLastDate - prependDays + 1
    viewDates = Array(prependDays)
      .fill()
      .map((item, idx) => idx + prevMonthStartLastDates)
      .map(
        date =>
          new Date(
            prevMonthEndDateObj.getFullYear(),
            prevMonthEndDateObj.getMonth(),
            date
          )
      )
      .reduce((prev, curr) => [...prev, curr], viewDates)
  }
  viewDates = Array(lastDate)
    .fill()
    .map((item, idx) => idx + 1)
    .map(
      date =>
        new Date(
          currMonthStartDateObj.getFullYear(),
          currMonthStartDateObj.getMonth(),
          date
        )
    )

    .reduce((prev, curr) => [...prev, curr], viewDates)

  viewDates = Array(trailingDays)
    .fill()
    .map((item, idx) => idx + 1)
    .map(
      date =>
        new Date(
          nextMonthStartDateObj.getFullYear(),
          nextMonthStartDateObj.getMonth(),
          date
        )
    )

    .reduce((prev, curr) => [...prev, curr], viewDates)
  return viewDates
}
