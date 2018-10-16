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
  weekends,
  onDrillDown,
  onDateSelected
}) => {
  const isYearView = currentView === 'Year'
  const dates = getMonthViewDates(currentStartDate, calendarType).map(
    (item, idx) => {
      const weekend = idx % 7
      const grayed =
        currentStartDate.getFullYear() !== item.getFullYear() ||
        currentStartDate.getMonth() !== item.getMonth()
      let showWeekend
      if (weekends && calendarType === 'ISO 8601') {
        showWeekend = weekend === 5 || weekend === 6
      }
      if (weekends && calendarType === 'US') {
        showWeekend = weekend === 0 || weekend === 6
      }
      return (
        <Tile
          key={idx}
          idx={idx}
          weekend={showWeekend}
          grayed={grayed}
          onDateSelected={onDateSelected}
          value={item}
        />
      )
    }
  )

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
        : dates}
    </div>
  )
}

Grid.propTypes = {
  onDrillDown: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  onDateSelected: PropTypes.func,
  currentStartDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  calendarType: PropTypes.string,
  weekends: PropTypes.bool
}

export default Grid
