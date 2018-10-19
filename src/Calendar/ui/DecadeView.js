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
  selectHandler
}) => {
  const data = Array(10)
    .fill()
    .map((item, idx) => getNewDate(currentViewDate, YEAR, idx))
    .map((item, idx) => {
      let disabled, selected
      if (disableableDecadeTiles) {
        disabled = isYearDisabled(item, availableDates, minDate, maxDate)
        selected = isYearSelected(item, selectedDate, selectedDates)
      }
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

DecadeView.propTypes = {
  disableableDecadeTiles: PropTypes.bool,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onDrillDown: PropTypes.func,
  locale: PropTypes.string,
  currentViewDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
export default DecadeView
