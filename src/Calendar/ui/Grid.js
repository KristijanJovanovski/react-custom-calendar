import './Grid.css'

import PropTypes from 'prop-types'
import React from 'react'

import { getMonthsArray, getMonthViewDates } from '../utils/helpers'
import Tile from './Tile'

const Grid = ({
  locale = 'en',
  calendarType = 'ISO 8601',
  currentView,
  currentStartDate,
  onDrillDown
}) => {
  const isYearView = currentView === 'Year'
  return (
    <div className={`grid${!isYearView ? ' grid-dates' : ' grid-months'}`}>
      {isYearView
        ? getMonthsArray(locale).map((item, idx) => (
            <Tile
              key={idx}
              onDrillDown={idx => onDrillDown(idx, 'Month')}
              monthType
              value={item}
              idx={idx}
            />
          ))
        : getMonthViewDates(currentStartDate, calendarType).map((n, idx) => (
            <Tile key={idx} idx={idx} value={n} />
          ))}
    </div>
  )
}

Grid.propTypes = {
  onDrillDown: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  currentStartDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  calendarType: PropTypes.string
}

export default Grid
