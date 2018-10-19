import PropTypes from 'prop-types'
import React from 'react'

import { DECADE } from '../utils/constants'
import {
  getDecadeRangeText,
  isDecadeDisabled,
  getNewDate,
  isDecadeSelected
} from '../utils/helpers'
import Tile from './Tile'

const CenturyView = ({
  disableableCenturyTiles,
  availableDates,
  minDate,
  maxDate,
  onDrillDown,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  range,
  hover,
  onHover,
  onDateSelected,
  selectHandler,
  selectedDate,
  selectedDates
}) => {
  const data = Array(10)
    .fill()
    .map((item, idx) => getNewDate(currentViewDate, DECADE, idx))
    .map((item, idx) => {
      let disabled, selected
      if (disableableCenturyTiles) {
        disabled = isDecadeDisabled(item, availableDates, minDate, maxDate)
        selected = isDecadeSelected(item, selectedDate, selectedDates)
      }
      return (
        <Tile
          key={idx}
          disabled={disabled}
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          onDrillDown={onDrillDown}
          value={getDecadeRangeText(item)}
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

CenturyView.propTypes = {
  disableableCenturyTiles: PropTypes.bool,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onDrillDown: PropTypes.func,
  locale: PropTypes.string,
  currentViewDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}

export default CenturyView
