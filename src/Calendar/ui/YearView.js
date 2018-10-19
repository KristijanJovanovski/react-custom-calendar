import PropTypes from 'prop-types'
import React from 'react'

import { LONG } from '../utils/constants'
import {
  getMonthFormated,
  getMonthsArray,
  isMonthDisabled,
  isMonthSelected
} from '../utils/helpers'
import Tile from './Tile'

const YearView = ({
  disableableYearTiles,
  availableDates,
  minDate,
  maxDate,
  onDrillDown,
  locale,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  selectedDate,
  selectedDates,
  range,
  hover,
  onHover,
  onDateSelected,
  selectHandler
}) => {
  const data = getMonthsArray(currentViewDate).map((item, idx) => {
    let disabled, selected
    const month = getMonthFormated(item, locale, LONG)
    if (disableableYearTiles) {
      disabled = isMonthDisabled(item, availableDates, minDate, maxDate)
    }
    selected = isMonthSelected(item, selectedDate, selectedDates, range)

    return (
      <Tile
        key={idx}
        disabled={disabled}
        onMouseEnter={onMouseEnterTile}
        onMouseLeave={onMouseLeaveTile}
        onDrillDown={onDrillDown}
        value={month}
        date={item}
        idx={idx}
        range={range}
        selected={selected && !disabled}
        hover={hover}
        onRangeHover={onHover}
        onDateSelected={onDateSelected}
        onDateSelect={selectHandler}
      />
    )
  })
  return <>{data}</>
}
YearView.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  range: PropTypes.bool,
  hover: PropTypes.bool,
  onHover: PropTypes.func,
  onDateSelected: PropTypes.func,
  selectHandler: PropTypes.func,
  disableableYearTiles: PropTypes.bool,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onDrillDown: PropTypes.func,
  locale: PropTypes.string,
  currentViewDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
export default YearView
