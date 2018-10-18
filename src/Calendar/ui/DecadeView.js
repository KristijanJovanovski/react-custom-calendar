import PropTypes from 'prop-types'
import React from 'react'

import { YEAR } from '../utils/constants'
import { getNewDate } from '../utils/helpers'
import Tile from './Tile'

const DecadeView = ({
  disableableDecadeTiles,
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
    .map((item, idx) => getNewDate(currentStartDate, YEAR, idx))
    .map((item, idx) => {
      let disabled
      if (disableableDecadeTiles) {
        if (!availableDates) {
          disabled =
            (minDate && item.getFullYear() < minDate.getFullYear()) ||
            (maxDate && item.getFullYear() > maxDate.getFullYear())
        } else if (!minDate && !maxDate) {
          disabled =
            availableDates &&
            !availableDates.some(
              availableItem =>
                availableItem.getFullYear() === item.getFullYear()
            )
        } else {
          disabled =
            !availableDates.some(
              availableItem =>
                availableItem.getFullYear() === item.getFullYear()
            ) &&
            (minDate &&
              maxDate &&
              (item.getFullYear() < minDate.getFullYear() ||
                item.getFullYear() > maxDate.getFullYear()))
        }
      }
      return (
        <Tile
          key={idx}
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          onDrillDown={idx => onDrillDown(idx)}
          value={item.getFullYear()}
          date={item}
          disabled={disabled}
          idx={idx}
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
  currentStartDate: PropTypes.instanceOf(Date),
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}
export default DecadeView
