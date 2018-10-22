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

export const getChildView = (date, min = MONTH) => {
  const units = [MONTH, YEAR, DECADE, CENTURY]
  if (units.some(u => u === date) && units.some(u => u === min)) {
    let idx = units.indexOf(date)

    if (idx > units.indexOf(min)) {
      return units[idx - 1]
    }
    return null
  }
  throw new Error('Not a vaild view unit')
}
export const getParentView = (date, max = CENTURY) => {
  const units = [MONTH, YEAR, DECADE, CENTURY]
  if (units.some(u => u === date) && units.some(u => u === max)) {
    let idx = units.indexOf(date)
    if (idx < units.indexOf(max)) {
      return units[idx + 1]
    }
    return null
  }
  throw new Error('Not a vaild view unit')
}
export const checkViewOrder = (min, max) => {
  const units = [MONTH, YEAR, DECADE, CENTURY]
  if (units.some(u => u === min) && units.some(u => u === max)) {
    return units.indexOf(min) <= units.indexOf(max)
  }
  throw new Error('Not a vaild view unit')
}
export const checkView = date => {
  const units = [MONTH, YEAR, DECADE, CENTURY]
  if (units.some(u => u === date)) {
    return true
  }
  throw new Error('Not a vaild view unit')
}
export const checkMinMaxDate = (minDate, maxDate) => {
  checkDate(minDate)
  checkDate(maxDate)
  if (afterDates(minDate, maxDate))
    throw new Error('Min Date cannot be after Max Date')
}

export const equalDates = (first, second) => {
  checkDate(first)
  checkDate(second)
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export const beforeDates = (first, second) => {
  checkDate(first)
  checkDate(second)
  return (
    first.getFullYear() < second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      (first.getMonth() < second.getMonth() ||
        (first.getMonth() === second.getMonth() &&
          first.getDate() < second.getDate())))
  )
}
export const afterDates = (first, second) => {
  checkDate(first)
  checkDate(second)
  return (
    first.getFullYear() > second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      (first.getMonth() > second.getMonth() ||
        (first.getMonth() === second.getMonth() &&
          first.getDate() > second.getDate())))
  )
}
export const beforeMonths = (first, second) => {
  checkDate(first)
  checkDate(second)
  return (
    first.getFullYear() < second.getFullYear() ||
    (first.getFullYear() === second.getFullYear() &&
      first.getMonth() < second.getMonth())
  )
}
export const afterMonths = (first, second) => {
  checkDate(first)
  checkDate(second)
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
  upperBound = year + (10 - (year % 10))
  return upperBound
}
export const getDecadeRangeText = date => {
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

export const getDateRange = (dateOne, dateTwo, type = DATE) => {
  checkDate(dateOne)
  checkDate(dateTwo)
  if (beforeDates(dateOne, dateTwo)) {
    if (type === DATE) {
      return rangeDate(dateOne, dateTwo)
    } else if (type === MONTH) {
      return rangeDate(dateOne, endOfMonthDate(dateTwo))
    } else if (type === YEAR) {
      return rangeDate(dateOne, new Date(dateTwo.getFullYear() + 1, 0, 0))
    } else if (type === DECADE) {
      return rangeDate(dateOne, new Date(dateTwo.getFullYear() + 10, 0, 0))
    } else if (type === CENTURY) {
      return rangeDate(dateOne, new Date(dateTwo.getFullYear() + 100, 0, 0))
    }
  } else if (afterDates(dateOne, dateTwo)) {
    if (type === DATE) {
      return rangeDate(dateTwo, dateOne)
    } else if (type === MONTH) {
      return rangeDate(dateTwo, endOfMonthDate(dateOne))
    } else if (type === YEAR) {
      return rangeDate(dateTwo, new Date(dateOne.getFullYear() + 1, 0, 0))
    } else if (type === DECADE) {
      return rangeDate(dateTwo, new Date(dateOne.getFullYear() + 10, 0, 0))
    } else if (type === CENTURY) {
      return rangeDate(dateTwo, new Date(dateOne.getFullYear() + 100, 0, 0))
    }
  }
  return [dateOne, dateTwo]
}
export const rangeDate = (lowerBound, upperBound) => {
  checkDate(lowerBound)
  checkDate(upperBound)
  const timeDiff = Math.abs(
    upperBound.getTime() -
      lowerBound.getTime() -
      (upperBound.getTimezoneOffset() * 1000 * 60 -
        lowerBound.getTimezoneOffset() * 1000 * 60)
  )
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  return Array(diffDays + 1)
    .fill()
    .map((item, idx) => {
      return new Date(
        lowerBound.getFullYear(),
        lowerBound.getMonth(),
        lowerBound.getDate() + idx
      )
    })
}
export const getMonthRange = (dateOne, dateTwo) => {
  checkDate(dateOne)
  checkDate(dateTwo)
  if (
    dateOne.getFullYear() < dateTwo.getFullYear() ||
    (dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() < dateTwo.getMonth())
  ) {
    return rangeMonth(dateOne, dateTwo)
  } else if (
    dateOne.getFullYear() > dateTwo.getFullYear() ||
    (dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() > dateTwo.getMonth())
  ) {
    return rangeMonth(dateTwo, dateOne)
  }
  return [dateOne, dateTwo]
}
export const rangeMonth = (lowerBound, upperBound) => {
  checkDate(lowerBound)
  checkDate(upperBound)
  const diffMonths =
    (upperBound.getFullYear() - lowerBound.getFullYear()) * 12 +
    (upperBound.getMonth() + 1 - (lowerBound.getMonth() + 1))
  return Array(diffMonths + 1)
    .fill()
    .map((item, idx) => {
      return new Date(lowerBound.getFullYear(), lowerBound.getMonth() + idx, 1)
    })
}
export const getYearRange = (dateOne, dateTwo) => {
  checkDate(dateOne)
  checkDate(dateTwo)
  if (dateOne.getFullYear() < dateTwo.getFullYear()) {
    return rangeYear(dateOne, dateTwo)
  } else if (dateOne.getFullYear() > dateTwo.getFullYear()) {
    return rangeYear(dateTwo, dateOne)
  }
  return [dateOne, dateTwo]
}

export const rangeYear = (lowerBound, upperBound) => {
  checkDate(lowerBound)
  checkDate(upperBound)
  const diffYears = upperBound.getFullYear() - lowerBound.getFullYear()
  return Array(diffYears + 1)
    .fill()
    .map((item, idx) => {
      return new Date(lowerBound.getFullYear() + idx, lowerBound.getMonth(), 1)
    })
}

export const getDecadeRange = (dateOne, dateTwo) => {
  checkDate(dateOne)
  checkDate(dateTwo)
  if (dateOne.getFullYear() < dateTwo.getFullYear()) {
    return rangeDecade(dateOne, dateTwo)
  } else if (dateOne.getFullYear() > dateTwo.getFullYear()) {
    return rangeDecade(dateTwo, dateOne)
  }
  return [dateOne, dateTwo]
}

export const rangeDecade = (lowerBound, upperBound) => {
  checkDate(lowerBound)
  checkDate(upperBound)
  const diffYears = Math.floor(
    (upperBound.getFullYear() - lowerBound.getFullYear()) / 10
  )
  return Array(diffYears + 1)
    .fill()
    .map((item, idx) => {
      return new Date(
        lowerBound.getFullYear() + idx * 10,
        lowerBound.getMonth(),
        1
      )
    })
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
    case CENTURY:
      year = getCentryStartYear(date)
      newDate = new Date(year, 0, idx)
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

export const isDateGrayed = (date, currentViewDate) => {
  if (date === null) return

  const grayed =
    currentViewDate.getFullYear() !== date.getFullYear() ||
    currentViewDate.getMonth() !== date.getMonth()
  return grayed
}

export const isDateSelected = (
  date,
  selectedDate,
  selectedDates,
  range = false
) => {
  if (date === null) return

  const selected =
    (selectedDates &&
      selectedDates.some(selectedDateItem =>
        equalDates(date, selectedDateItem)
      )) ||
    (selectedDate && equalDates(date, selectedDate)) ||
    (range &&
      selectedDates &&
      selectedDates.length >= 2 &&
      afterDates(date, selectedDates[0]) &&
      beforeDates(date, selectedDates[selectedDates.length - 1]))
  return selected
}
export const isMonthSelected = (
  dateMonth,
  selectedDate,
  selectedDates,
  range = false
) => {
  if (dateMonth === null) return

  const selected =
    (selectedDates &&
      selectedDates.some(
        selectedDateItem =>
          selectedDateItem.getMonth() === dateMonth.getMonth() &&
          selectedDateItem.getFullYear() === dateMonth.getFullYear()
      )) ||
    (selectedDate &&
      selectedDate.getMonth() === dateMonth.getMonth() &&
      selectedDate.getFullYear() === dateMonth.getFullYear()) ||
    (range &&
      selectedDates &&
      selectedDates.length >= 2 &&
      ((afterDates(dateMonth, selectedDates[0]) &&
        beforeDates(dateMonth, selectedDates[selectedDates.length - 1])) ||
        (equalDates(dateMonth, selectedDates[0]) &&
          equalDates(dateMonth, selectedDates[selectedDates.length - 1]))))
  return selected
}
export const isYearSelected = (
  dateYear,
  selectedDate,
  selectedDates,
  range
) => {
  if (dateYear === null) return

  const selected =
    (selectedDates &&
      selectedDates.some(
        selectedDateItem =>
          selectedDateItem.getFullYear() === dateYear.getFullYear()
      )) ||
    (selectedDate && selectedDate.getFullYear() === dateYear.getFullYear()) ||
    (range &&
      selectedDates &&
      selectedDates.length >= 2 &&
      ((afterDates(dateYear, selectedDates[0]) &&
        beforeDates(dateYear, selectedDates[selectedDates.length - 1])) ||
        (equalDates(dateYear, selectedDates[0]) &&
          equalDates(dateYear, selectedDates[selectedDates.length - 1]))))
  return selected
}
export const isDecadeSelected = (dateDecade, selectedDate, selectedDates, range) => {
  if (dateDecade === null) return

  const selected =
    (selectedDates &&
      selectedDates.some(
        selectedDateItem =>
          getDecadeStartYear(selectedDateItem) ===
            getDecadeStartYear(dateDecade) &&
          getDecadeEndYear(selectedDateItem) === getDecadeEndYear(dateDecade)
      )) ||
    (selectedDate &&
      getDecadeStartYear(selectedDate) === getDecadeStartYear(dateDecade) &&
      getDecadeEndYear(selectedDate) === getDecadeEndYear(dateDecade)) ||
    (range &&
      selectedDates &&
      selectedDates.length >= 2 &&
      ((afterDates(dateDecade, selectedDates[0]) &&
        beforeDates(dateDecade, selectedDates[selectedDates.length - 1])) ||
        (equalDates(dateDecade, selectedDates[0]) &&
          equalDates(dateDecade, selectedDates[selectedDates.length - 1]))))
  return selected
}

export const isDateDisabled = (
  date,
  availableDates,
  minDate,
  maxDate,
  disabledDates,
  ...rest
) => {
  if (date === null) return
  let disabled
  if (!availableDates) {
    disabled =
      (minDate && beforeDates(date, minDate)) ||
      (maxDate && afterDates(date, maxDate)) ||
      (disabledDates &&
        disabledDates.some(disabledDateItem =>
          equalDates(disabledDateItem, date)
        ))
  } else if (!minDate && !maxDate) {
    disabled = !availableDates.some(availableDateItem =>
      equalDates(availableDateItem, date)
    )
  } else {
    disabled =
      (!availableDates.some(availableDateItem =>
        equalDates(availableDateItem, date)
      ) &&
        (minDate &&
          maxDate &&
          (beforeDates(date, minDate) || afterDates(date, maxDate)))) ||
      (disabledDates &&
        disabledDates.some(disabledDateItem =>
          equalDates(disabledDateItem, date)
        ))
  }
  return disabled
}

export const isMonthDisabled = (
  dateMonth,
  availableDates,
  minDate,
  maxDate,
  ...rest
) => {
  let disabled
  if (!availableDates) {
    disabled =
      (minDate && beforeMonths(dateMonth, minDate)) ||
      (maxDate && afterMonths(dateMonth, maxDate))
  } else if (!minDate && !maxDate) {
    disabled = !availableDates.some(
      availableItem =>
        availableItem.getMonth() === dateMonth.getMonth() &&
        availableItem.getFullYear() === dateMonth.getFullYear()
    )
  } else {
    disabled =
      !availableDates.some(
        availableItem =>
          availableItem.getMonth() === dateMonth.getMonth() &&
          availableItem.getFullYear() === dateMonth.getFullYear()
      ) &&
      (minDate &&
        maxDate &&
        (beforeMonths(dateMonth, minDate) || afterMonths(dateMonth, maxDate)))
  }
  return disabled
}

export const isYearDisabled = (
  dateYear,
  availableDates,
  minDate,
  maxDate,
  ...rest
) => {
  let disabled
  if (!availableDates) {
    disabled =
      (minDate && dateYear.getFullYear() < minDate.getFullYear()) ||
      (maxDate && dateYear.getFullYear() > maxDate.getFullYear())
  } else if (!minDate && !maxDate) {
    disabled =
      availableDates &&
      !availableDates.some(
        availableItem => availableItem.getFullYear() === dateYear.getFullYear()
      )
  } else {
    disabled =
      !availableDates.some(
        availableItem => availableItem.getFullYear() === dateYear.getFullYear()
      ) &&
      (minDate &&
        maxDate &&
        (dateYear.getFullYear() < minDate.getFullYear() ||
          dateYear.getFullYear() > maxDate.getFullYear()))
  }
  return disabled
}

export const isDecadeDisabled = (
  dateDecade,
  availableDates,
  minDate,
  maxDate,
  ...rest
) => {
  let disabled
  const startYear = getDecadeStartYear(dateDecade)
  const endYear = getDecadeEndYear(dateDecade)
  if (!availableDates) {
    disabled =
      (minDate && startYear > minDate.getFullYear()) ||
      (minDate && endYear < minDate.getFullYear()) ||
      ((maxDate && startYear > maxDate.getFullYear()) ||
        (maxDate && endYear < maxDate.getFullYear()))
  } else if (!minDate && !maxDate) {
    disabled =
      availableDates &&
      !availableDates.some(
        availableItem =>
          startYear < availableItem.getFullYear() &&
          endYear > availableItem.getFullYear()
      )
  } else {
    disabled =
      !availableDates.some(
        availableItem =>
          startYear < availableItem.getFullYear() &&
          endYear > availableItem.getFullYear()
      ) &&
      ((minDate && startYear > minDate.getFullYear()) ||
        (minDate && endYear < minDate.getFullYear()) ||
        ((maxDate && startYear > maxDate.getFullYear()) ||
          (maxDate && endYear < maxDate.getFullYear())))
  }
  return disabled
}

export const isWeekend = (idx, weekends, calendarType) => {
  let showWeekend
  const weekend = idx % 7
  if (weekends && calendarType === 'ISO 8601') {
    showWeekend = weekend === 5 || weekend === 6
  }
  if (weekends && calendarType === 'US') {
    showWeekend = weekend === 0 || weekend === 6
  }
  return showWeekend
}
