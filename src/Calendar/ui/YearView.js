import PropTypes from 'prop-types'
import React from 'react'

import { LONG } from '../utils/constants'
import {
  afterMonths,
  beforeMonths,
  getMonthFormated,
  getMonthsArray
} from '../utils/helpers'
import Tile from './Tile'

const YearView = ({
  disableableYearTiles,
  availableDates,
  minDate,
  maxDate,
  onDrillDown,
  locale,
  currentStartDate,
  onMouseEnterTile,
  onMouseLeaveTile
}) => {
  const data = getMonthsArray(currentStartDate).map((item, idx) => {
    let disabled
    const month = getMonthFormated(item, locale, LONG)
    if (disableableYearTiles) {
      if (!availableDates) {
        disabled =
          (minDate && beforeMonths(item, minDate)) ||
          (maxDate && afterMonths(item, maxDate))
      } else if (!minDate && !maxDate) {
        disabled = !availableDates.some(
          availableItem => availableItem.getMonth() === item.getMonth()
        )
      } else {
        disabled =
          !availableDates.some(
            availableItem => availableItem.getMonth() === item.getMonth()
          ) &&
          (minDate &&
            maxDate &&
            (beforeMonths(item, minDate) || afterMonths(item, maxDate)))
      }
    }

    return (
      <Tile
        key={idx}
        disabled={disabled}
        onMouseEnter={onMouseEnterTile}
        onMouseLeave={onMouseLeaveTile}
        onDrillDown={idx => onDrillDown(idx)}
        value={month}
        date={item}
        idx={idx}
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
  currentStartDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
export default YearView
