import PropTypes from 'prop-types'
import React from 'react'

import { DECADE } from '../utils/constants'
import {
  getDecadeEndYear,
  getDecadeRange,
  getDecadeStartYear,
  getNewDate
} from '../utils/helpers'
import Tile from './Tile'

const CenturyView = ({
  disableableCenturyTiles,
  availableDates,
  minDate,
  maxDate,
  onDrillDown,
  currentStartDate,
  onMouseEnterTile,
  onMouseLeaveTile
}) => {
  const data = Array(10)
    .fill()
    .map((item, idx) => getNewDate(currentStartDate, DECADE, idx))
    .map((item, idx) => {
      let disabled
      if (disableableCenturyTiles) {
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
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          onDrillDown={idx => onDrillDown(idx)}
          value={getDecadeRange(item)}
          date={item}
          idx={idx}
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
  currentStartDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}

export default CenturyView
