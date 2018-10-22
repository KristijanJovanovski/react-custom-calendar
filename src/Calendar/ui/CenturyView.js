import PropTypes from 'prop-types'
import React from 'react'

import { DECADE } from '../utils/constants'
import {
  getDecadeRangeText,
  getNewDate,
  isDecadeDisabled,
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
  selectedDates,
  tileClasses
}) => {
  const data = Array(10)
    .fill()
    .map((item, idx) => getNewDate(currentViewDate, DECADE, idx))
    .map((item, idx) => {
      let disabled, selected
      if (disableableCenturyTiles) {
        disabled = isDecadeDisabled(item, availableDates, minDate, maxDate)
      }
      selected = isDecadeSelected(item, selectedDate, selectedDates, range)
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

CenturyView.propTypes = {
  range: PropTypes.bool,
  hover: PropTypes.bool,
  onHover: PropTypes.func,
  onDateSelected: PropTypes.func,
  selectHandler: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  disableableCenturyTiles: PropTypes.bool,
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

export default CenturyView
