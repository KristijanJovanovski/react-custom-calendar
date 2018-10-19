import PropTypes from 'prop-types'
import React from 'react'

import { LONG } from '../utils/constants'
import {
  getMonthFormated,
  getMonthsArray,
  isMonthSelected,
  isMonthDisabled
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
    selected = isMonthSelected(item, selectedDate, selectedDates)

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
        selected={selected}
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
  disabledYearTiles: PropTypes.bool,
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
