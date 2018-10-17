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
  getDecadeRange
} from '../utils/helpers'
import Tile from './Tile'
import { MONTH, YEAR, DECADE, CENTURY } from '../utils/constants'

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
  onNext
}) => {
  const selectHandler = (date, selected) => {
    const selectFn = multiSelect ? onMultiSelect : onSingleSelect
    if (beforeDates(date, firstOfMonthDate(currentStartDate))) {
      onPrev && onPrev()
    } else if (afterDates(date, endOfMonthDate(currentStartDate))) {
      onNext && onNext()
    }
    selectFn(date, selected)
  }
  const isMonthView = currentView === MONTH

  let data
  switch (currentView) {
    case MONTH:
      data = getMonthViewDates(currentStartDate, calendarType).map(
        (item, idx) => {
          const weekend = idx % 7
          const grayed =
            currentStartDate.getFullYear() !== item.getFullYear() ||
            currentStartDate.getMonth() !== item.getMonth()
          const selected =
            (selectedDates &&
              selectedDates.some(selectedItem =>
                equalDates(item, selectedItem)
              )) ||
            (selectedDate && equalDates(item, selectedDate))
          let disabled
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

          let showWeekend
          if (weekends && calendarType === 'ISO 8601') {
            showWeekend = weekend === 5 || weekend === 6
          }
          if (weekends && calendarType === 'US') {
            showWeekend = weekend === 0 || weekend === 6
          }
          return (
            <Tile
              key={idx}
              idx={idx}
              dateType
              weekend={showWeekend}
              grayed={grayed}
              disabled={disabled}
              selected={selected}
              onDateSelected={onDateSelected}
              onDateSelect={selectHandler}
              value={item}
            />
          )
        }
      )
      break
    case YEAR:
      data = getMonthsArray(locale).map((item, idx) => (
        <Tile
          key={idx}
          onDrillDown={idx => onDrillDown(idx)}
          value={item}
          idx={idx}
        />
      ))
      break
    case DECADE:
      data = Array(10)
        .fill()
        .map((item, idx) => (
          <Tile
            key={idx}
            onDrillDown={idx => onDrillDown(idx)}
            value={getNewDate(currentStartDate, YEAR, idx).getFullYear()}
            idx={idx}
          />
        ))
      break
    case CENTURY:
      data = Array(10)
        .fill()
        .map((item, idx) => (
          <Tile
            key={idx}
            onDrillDown={idx => onDrillDown(idx)}
            value={getDecadeRange(getNewDate(currentStartDate, DECADE, idx))}
            idx={idx}
          />
        ))
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
  selectedDate: PropTypes.instanceOf(Date)
}

export default Grid
