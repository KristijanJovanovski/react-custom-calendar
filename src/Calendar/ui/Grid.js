import './Grid.css'

import PropTypes from 'prop-types'
import React from 'react'

import {
  afterDates,
  beforeDates,
  firstOfMonthDate,
  endOfMonthDate,
  equalDates,
  getMonthsArray,
  getMonthViewDates,
  getNewDate,
  getDecadeRange,
  getMonthFormated,
  beforeMonths,
  afterMonths,
  getDecadeStartYear,
  getDecadeEndYear
} from '../utils/helpers'
import Tile from './Tile'
import { MONTH, YEAR, DECADE, CENTURY, LONG } from '../utils/constants'

const Grid = ({
  locale = 'en',
  calendarType = 'ISO 8601',
  currentView,
  currentStartDate,
  weekends,
  onDrillDown,
  onDateSelected,
  minDate,
  maxDate,
  disabledDates,
  availableDates,
  selectedDates,
  selectedDate,
  multiSelect,
  onMultiSelect,
  onSingleSelect,
  onPrev,
  onNext,
  disableableYearViewTiles,
  disableableDecadeViewTiles,
  disableableCenturyViewTiles,
  navigableBeforeAndAfterDates,
  hideBeforeAndAfterDates
}) => {
  const selectHandler = (date, selected) => {
    const selectFn = multiSelect ? onMultiSelect : onSingleSelect
    if (
      navigableBeforeAndAfterDates &&
      beforeDates(date, firstOfMonthDate(currentStartDate))
    ) {
      onPrev && onPrev()
    } else if (
      navigableBeforeAndAfterDates &&
      afterDates(date, endOfMonthDate(currentStartDate))
    ) {
      onNext && onNext()
    }
    selectFn(date, selected)
  }
  const isMonthView = currentView === MONTH

  let data
  switch (currentView) {
    case MONTH:
      data = getMonthViewDates(
        currentStartDate,
        calendarType,
        !!hideBeforeAndAfterDates
      ).map((item, idx) => {
        const weekend = idx % 7
        let blank, grayed, disabled, showWeekend, selected
        if (item === null) {
          blank = true
        } else {
          grayed =
            currentStartDate.getFullYear() !== item.getFullYear() ||
            currentStartDate.getMonth() !== item.getMonth()
          selected =
            (selectedDates &&
              selectedDates.some(selectedItem =>
                equalDates(item, selectedItem)
              )) ||
            (selectedDate && equalDates(item, selectedDate))

          if (!availableDates) {
            disabled =
              (minDate && beforeDates(item, minDate)) ||
              (maxDate && afterDates(item, maxDate)) ||
              (disabledDates &&
                disabledDates.some(disabledItems =>
                  equalDates(disabledItems, item)
                ))
          } else if (!minDate && !maxDate) {
            disabled = !availableDates.some(availableItems =>
              equalDates(availableItems, item)
            )
          } else {
            disabled =
              (!availableDates.some(availableItems =>
                equalDates(availableItems, item)
              ) &&
                (minDate &&
                  maxDate &&
                  (beforeDates(item, minDate) || afterDates(item, maxDate)))) ||
              (disabledDates &&
                disabledDates.some(disabledItems =>
                  equalDates(disabledItems, item)
                ))
          }

          if (weekends && calendarType === 'ISO 8601') {
            showWeekend = weekend === 5 || weekend === 6
          }
          if (weekends && calendarType === 'US') {
            showWeekend = weekend === 0 || weekend === 6
          }
        }
        return (
          <Tile
            key={idx}
            idx={idx}
            dateType
            blank={blank}
            weekend={showWeekend}
            grayed={grayed}
            disabled={disabled}
            selected={selected}
            onDateSelected={onDateSelected}
            onDateSelect={selectHandler}
            value={item}
          />
        )
      })
      break
    case YEAR:
      data = getMonthsArray(currentStartDate).map((item, idx) => {
        let disabled
        const month = getMonthFormated(item, locale, LONG)
        if (disableableYearViewTiles) {
          if (!availableDates) {
            disabled =
              (minDate && beforeMonths(item, minDate)) ||
              (maxDate && afterMonths(item, maxDate))
          } else if (!minDate && !maxDate) {
            disabled = !availableDates.some(
              availableItem => availableItem.getMonth() === item.getMonth()
            )
          } else {
            disabled =
              !availableDates.some(
                availableItem => availableItem.getMonth() === item.getMonth()
              ) &&
              (minDate &&
                maxDate &&
                (beforeMonths(item, minDate) || afterMonths(item, maxDate)))
          }
        }

        return (
          <Tile
            key={idx}
            disabled={disabled}
            onDrillDown={idx => onDrillDown(idx)}
            value={month}
            idx={idx}
          />
        )
      })
      break
    case DECADE:
      data = Array(10)
        .fill()
        .map((item, idx) => getNewDate(currentStartDate, YEAR, idx))
        .map((item, idx) => {
          let disabled
          if (disableableDecadeViewTiles) {
            if (!availableDates) {
              disabled =
                (minDate && item.getFullYear() < minDate.getFullYear()) ||
                (maxDate && item.getFullYear() > maxDate.getFullYear())
            } else if (!minDate && !maxDate) {
              disabled =
                availableDates &&
                !availableDates.some(
                  availableItem =>
                    availableItem.getFullYear() === item.getFullYear()
                )
            } else {
              disabled =
                !availableDates.some(
                  availableItem =>
                    availableItem.getFullYear() === item.getFullYear()
                ) &&
                (minDate &&
                  maxDate &&
                  (item.getFullYear() < minDate.getFullYear() ||
                    item.getFullYear() > maxDate.getFullYear()))
            }
          }
          return (
            <Tile
              key={idx}
              onDrillDown={idx => onDrillDown(idx)}
              value={item.getFullYear()}
              disabled={disabled}
              idx={idx}
            />
          )
        })
      break
    case CENTURY:
      data = Array(10)
        .fill()
        .map((item, idx) => getNewDate(currentStartDate, DECADE, idx))
        .map((item, idx) => {
          let disabled
          if (disableableCenturyViewTiles) {
            const startYear = getDecadeStartYear(item)
            const endYear = getDecadeEndYear(item)
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
          }
          return (
            <Tile
              key={idx}
              disabled={disabled}
              onDrillDown={idx => onDrillDown(idx)}
              value={getDecadeRange(item)}
              idx={idx}
            />
          )
        })
      break

    default:
      break
  }
  return (
    <div className={`grid${isMonthView ? ' grid-dates' : ' grid-months'}`}>
      {data}
    </div>
  )
}

Grid.propTypes = {
  onDrillDown: PropTypes.func.isRequired,
  onMultiSelect: PropTypes.func.isRequired,
  onSingleSelect: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDateSelected: PropTypes.func,
  currentStartDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  calendarType: PropTypes.string,
  weekends: PropTypes.bool,
  multiSelect: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDate: PropTypes.instanceOf(Date),
  disableableYearViewTiles: PropTypes.bool,
  disableableDecadeViewTiles: PropTypes.bool,
  disableableCenturyViewTiles: PropTypes.bool,
  navigableBeforeAndAfterDates: PropTypes.bool,
  hideBeforeAndAfterDates: PropTypes.bool
}

export default Grid
