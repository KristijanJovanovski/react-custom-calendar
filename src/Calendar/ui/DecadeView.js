import PropTypes from 'prop-types'
import React from 'react'

import { YEAR } from '../utils/constants'
import { getNewDate, isYearDisabled, isYearSelected } from '../utils/helpers'
import Tile from './Tile'

const DecadeView = ({
  disableableDecadeTiles,
  availableDates,
  minDate,
  maxDate,
  onDrillDown,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  range,
  selectedDate,
  selectedDates,
  hover,
  onHover,
  onDateSelected,
  tileClasses,
  selectHandler
}) => {
  const data = Array(10)
    .fill()
    .map((item, idx) => getNewDate(currentViewDate, YEAR, idx))
    .map((item, idx) => {
      let disabled, selected
      if (disableableDecadeTiles) {
        disabled = isYearDisabled(item, availableDates, minDate, maxDate)
      }
      selected = isYearSelected(item, selectedDate, selectedDates, range)
      return (
        <Tile
          key={idx}
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          onDrillDown={onDrillDown}
          value={item.getFullYear()}
          date={item}
          disabled={disabled}
          idx={idx}
          range={range}
          selected={selected && !disabled}
          hover={hover}
          onRangeHover={onHover}
          onDateSelected={onDateSelected}
          onDateSelect={selectHandler}
          tileClasses={tileClasses}
        />
      )
    })
  return <>{data}</>
}

DecadeView.propTypes = {
  range: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hover: PropTypes.bool,
  onHover: PropTypes.func,
  onDateSelected: PropTypes.func,
  selectHandler: PropTypes.func,
  disableableDecadeTiles: PropTypes.bool,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onDrillDown: PropTypes.func,
  locale: PropTypes.string,
  tileClasses: PropTypes.string,
  currentViewDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
export default DecadeView
