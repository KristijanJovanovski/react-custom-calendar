import {
  days,
  months,
  DATE,
  MONTH,
  YEAR,
  DECADE,
  CENTURY,
  SHORT,
  LONG
} from './constants'
export const capitalizeFirst = str =>
  str
    .split('')
    .map((c, idx) => (idx ? c.toLowerCase() : c.toUpperCase()))
    .join('')

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
export const beforeMonths = (first, second) => {
  return (
    first.getFullYear() < second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      first.getMonth() < second.getMonth())
  )
}
export const afterMonths = (first, second) => {
  return (
    first.getFullYear() > second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      first.getMonth() > second.getMonth())
  )
}

export const getMonthsArray = date => {
  checkDate(date)
  return Array(12)
    .fill()
    .map((i, idx) => new Date(date.getFullYear(), idx))
}

export const transformWeekDays = (
  format = SHORT,
  locale = 'en',
  calendarType = 'ISO 8601'
) => {
  let dayFormat = format === LONG ? 'long' : 'short'
  if (calendarType === 'ISO 8601') {
    if (locale !== 'mk') {
      return Array(7)
        .fill()
        .map((i, idx) =>
          new Intl.DateTimeFormat([locale], {
            weekday: dayFormat
          }).format(new Date(new Date(0).setDate(idx + 5)))
        )
    }
    return [
      ...days[locale][dayFormat].slice(1),
      days[locale][dayFormat][0]
    ].map(d => capitalizeFirst(d))
  }
  if (calendarType === 'US') {
    if (locale !== 'mk') {
      return Array(7)
        .fill()
        .map((i, idx) =>
          new Intl.DateTimeFormat([locale], {
            weekday: dayFormat
          }).format(new Date(new Date(0).setDate(idx + 4)))
        )
    }
    return [...days[locale][dayFormat]].map(d => capitalizeFirst(d))
  }
}

export const getMonthAndYear = (date, locale = 'en', format = LONG) => {
  checkDate(date)
  const month = getMonthFormated(date, locale, format)
  const year = getYear(date)
  return `${month} ${year}`
}

export const getYear = date => {
  checkDate(date)
  return date.getFullYear()
}
export const getDecadeStartYear = date => {
  checkDate(date)
  const year = date.getFullYear()
  let bottomBound
  year % 10 === 0
    ? (bottomBound = year - (9 - (year % 10)))
    : (bottomBound = year - (year % 10) + 1)
  return bottomBound
}
export const getDecadeEndYear = date => {
  checkDate(date)
  const year = date.getFullYear()
  let upperBound
  year % 10 === 0
    ? (upperBound = year + 10)
    : (upperBound = year + (10 - (year % 10)))
  return upperBound
}
export const getDecadeRange = date => {
  checkDate(date)
  const bottomBound = getDecadeStartYear(date)
  const upperBound = getDecadeEndYear(date)
  return `${bottomBound}-${upperBound}`
}

export const getCenturyRange = date => {
  checkDate(date)
  const bottomBound = getCentryStartYear(date)
  const upperBound = getCentryEndYear(date)
  return `${bottomBound}-${upperBound}`
}
export const getCentryStartYear = date => {
  checkDate(date)
  const year = date.getFullYear()
  const century = Math.floor(year / 100)
  const years = year % 100
  let bottomBound
  years === 0
    ? (bottomBound = (century - 1) * 100 + 1)
    : (bottomBound = century * 100 + 1)
  return bottomBound
}
export const getCentryEndYear = date => {
  checkDate(date)
  const year = date.getFullYear()
  const century = Math.floor(year / 100)
  const years = year % 100
  let upperBound
  years === 0
    ? (upperBound = century * 100)
    : (upperBound = (century + 1) * 100)
  return upperBound
}

export const getMonthFormated = (date, locale = 'en', format = LONG) => {
  checkDate(date)
  if (locale === 'mk') {
    return months[locale][date.getMonth() + 1]
  }
  return new Intl.DateTimeFormat(locale, {
    month: `${format === LONG ? 'long' : 'short'}`
  }).format(date)
}

export const getPrevDate = (date, type) => {
  checkDate(date)
  let newDate = date
  switch (type) {
    case MONTH:
      newDate = new Date(date.getFullYear(), date.getMonth() - 1)
      break
    case YEAR:
      newDate = new Date(date.getFullYear() - 1, date.getMonth())
      break
    case DECADE:
      newDate = new Date(date.getFullYear() - 10, date.getMonth())
      break
    case CENTURY:
      newDate = new Date(date.getFullYear() - 100, date.getMonth())
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
    case MONTH:
      newDate = new Date(date.getFullYear(), date.getMonth() + 1)
      break
    case YEAR:
      newDate = new Date(date.getFullYear() + 1, date.getMonth())
      break
    case DECADE:
      newDate = new Date(date.getFullYear() + 10, date.getMonth())
      break
    case CENTURY:
      newDate = new Date(date.getFullYear() + 100, date.getMonth())
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
    case MONTH:
      newDate = new Date(date.getFullYear() - 1, date.getMonth())
      break
    case YEAR:
      newDate = new Date(date.getFullYear() - 10, date.getMonth())
      break
    case DECADE:
      newDate = new Date(date.getFullYear() - 100, date.getMonth())
      break
    case CENTURY:
      newDate = new Date(date.getFullYear() - 1000, date.getMonth())
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
    case MONTH:
      newDate = new Date(date.getFullYear() + 1, date.getMonth())
      break
    case YEAR:
      newDate = new Date(date.getFullYear() + 10, date.getMonth())
      break
    case DECADE:
      newDate = new Date(date.getFullYear() + 100, date.getMonth())
      break
    case CENTURY:
      newDate = new Date(date.getFullYear() + 1000, date.getMonth())
      break

    default:
      break
  }
  return newDate
}

export const getNewDate = (date, type, idx) => {
  checkDate(date)
  let year,
    newDate = date
  switch (type) {
    case DATE:
      newDate = new Date(date.getFullYear(), date.getMonth(), idx)
      break
    case MONTH:
      newDate = new Date(date.getFullYear(), idx)
      break
    case YEAR:
      year = getDecadeStartYear(date) + idx
      newDate = new Date(year, 0)
      break
    case DECADE:
      year = getCentryStartYear(date) + idx * 10
      newDate = new Date(year, 0)
      break

    default:
      break
  }
  return newDate
}
export const firstOfMonthDate = date => {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month, 1)
}
export const endOfMonthDate = date => {
  const month = date.getMonth()
  const year = date.getFullYear()
  return new Date(year, month + 1, 0)
}

export const getMonthViewDates = (
  date,
  type = 'ISO 8601',
  hideBeforeAndAfterDates = false
) => {
  checkDate(date)
  let viewDates = []
  const month = date.getMonth()
  const year = date.getFullYear()

  const currMonthStartDateObj = firstOfMonthDate(date)
  const currMonthEndDateObj = endOfMonthDate(date)
  const currMonthLastDate = currMonthEndDateObj.getDate()
  const currMonthFirstDay = currMonthStartDateObj.getDay()
  const currMonthLastDay = currMonthEndDateObj.getDay()

  const prevMonthEndDateObj = new Date(year, month, 0)
  const prevMonthLastDate = prevMonthEndDateObj.getDate()

  const nextMonthStartDateObj = new Date(year, month + 1, 1)

  let trailingDates, prependDates

  if (type === 'ISO 8601') {
    trailingDates = (6 - currMonthLastDay + 1) % 7
    prependDates = (currMonthFirstDay + 6) % 7
  } else if (type === 'US') {
    prependDates = currMonthFirstDay
    trailingDates = (6 - currMonthLastDay) % 7
  }

  if (prependDates !== 0) {
    const prevMonthStartLastDates = prevMonthLastDate - prependDates + 1
    viewDates = Array(prependDates)
      .fill()
      .map((item, idx) => idx + prevMonthStartLastDates)
      .map(
        date =>
          hideBeforeAndAfterDates
            ? null
            : new Date(
                prevMonthEndDateObj.getFullYear(),
                prevMonthEndDateObj.getMonth(),
                date
              )
      )
      .reduce((prev, curr) => [...prev, curr], viewDates)
  }
  viewDates = Array(currMonthLastDate)
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

  viewDates = Array(trailingDates)
    .fill()
    .map((item, idx) => idx + 1)
    .map(
      date =>
        hideBeforeAndAfterDates
          ? null
          : new Date(
              nextMonthStartDateObj.getFullYear(),
              nextMonthStartDateObj.getMonth(),
              date
            )
    )
    .reduce((prev, curr) => [...prev, curr], viewDates)

  return viewDates
}
