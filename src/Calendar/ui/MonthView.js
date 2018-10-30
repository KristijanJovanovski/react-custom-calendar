import PropTypes from 'prop-types'
import React from 'react'

import {
  equalDates,
  getMonthViewDates,
  isDateDisabled,
  isDateGrayed,
  isDateSelected,
  isWeekend
} from '../utils/helpers'
import { US, ISO_8601 } from '../utils/constants'
import Tile from './Tile'

const MonthView = ({
  range,
  calendarType,
  currentViewDate,
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
  onMouseLeaveTile,
  onHover,
  hoverDates,
  tileClasses,
  disableWeekdays
}) => {
  const data = getMonthViewDates(
    currentViewDate,
    calendarType,
    !!hideBeforeAndAfterDates
  ).map((item, idx) => {
    let hover, blank, showWeekend, grayed, disabled, selected
    if (item === null) {
      blank = true
    } else {
      grayed = isDateGrayed(item, currentViewDate)
      selected = isDateSelected(item, selectedDate, selectedDates, range)
      disabled = isDateDisabled(
        item,
        availableDates,
        minDate,
        maxDate,
        disabledDates,
        disableWeekdays
      )
      showWeekend = isWeekend(idx, weekends, calendarType)
      if (range && hoverDates && onHover && selectedDate) {
        hover = hoverDates.some(hoverItem => equalDates(hoverItem, item))
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
        range={range}
        selected={selected && !disabled}
        hover={hover}
        onRangeHover={onHover}
        onDateSelected={onDateSelected}
        onDateSelect={selectHandler}
        value={(item && item.getDate()) || ''}
        date={item}
        tileClasses={tileClasses}
      />
    )
  })
  return <> {data}</>
}

MonthView.propTypes = {
  calendarType: PropTypes.oneOf([US, ISO_8601]),
  currentViewDate: PropTypes.instanceOf(Date).isRequired,
  weekends: PropTypes.bool,
  range: PropTypes.bool,
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
  onMouseLeaveTile: PropTypes.func,
  onHover: PropTypes.func,
  hoverDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tileClasses: PropTypes.string
}
MonthView.defaultProps = {
  calendarType: ISO_8601
}
export default MonthView
