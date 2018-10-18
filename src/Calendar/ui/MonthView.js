import PropTypes from 'prop-types'
import React from 'react'

import {
  afterDates,
  beforeDates,
  equalDates,
  getMonthViewDates
} from '../utils/helpers'
import Tile from './Tile'

const MonthView = ({
  calendarType,
  currentStartDate,
  weekends,
  onDateSelected,
  minDate,
  maxDate,
  disabledDates,
  availableDates,
  selectedDates,
  selectedDate,
  selectHandler,
  hideBeforeAndAfterDates,
  onMouseEnterTile,
  onMouseLeaveTile
}) => {
  const data = getMonthViewDates(
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
          selectedDates.some(selectedItem => equalDates(item, selectedItem))) ||
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
        onMouseEnter={onMouseEnterTile}
        onMouseLeave={onMouseLeaveTile}
        disabled={disabled}
        selected={selected}
        onDateSelected={onDateSelected}
        onDateSelect={selectHandler}
        value={item.getDate()}
        date={item}
      />
    )
  })
  return <> {data}</>
}

MonthView.propTypes = {
  calendarType: PropTypes.string,
  currentStartDate: PropTypes.instanceOf(Date).isRequired,
  weekends: PropTypes.bool,
  onDateSelected: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDate: PropTypes.instanceOf(Date),
  selectHandler: PropTypes.func,
  hideBeforeAndAfterDates: PropTypes.bool,
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
MonthView.defaultProps = {
  calendarType: 'ISO 8601'
}
export default MonthView
