import './CalendarView.css'

import PropTypes from 'prop-types'
import React from 'react'

import { CENTURY, DECADE, MONTH, YEAR } from '../utils/constants'
import {
  afterDates,
  beforeDates,
  endOfMonthDate,
  firstOfMonthDate
} from '../utils/helpers'
import CenturyView from './CenturyView'
import DecadeView from './DecadeView'
import MonthView from './MonthView'
import YearView from './YearView'

const CalendarView = ({
  locale,
  calendarType,
  currentView,
  currentViewDate,
  weekends,
  onDrillDown,
  onDateSelected,
  minDate,
  maxDate,
  disabledDates,
  availableDates,
  selectedDates,
  selectedDate,
  multiSelect,
  onMultiSelect,
  onSingleSelect,
  onPrev,
  onNext,
  disableableYearTiles,
  disableableDecadeTiles,
  disableableCenturyTiles,
  navigableBeforeAndAfterDates,
  hideBeforeAndAfterDates,
  onMouseEnterTile,
  onMouseLeaveTile
}) => {
  const selectHandler = (date, selected) => {
    const selectFn = multiSelect ? onMultiSelect : onSingleSelect
    if (
      navigableBeforeAndAfterDates &&
      beforeDates(date, firstOfMonthDate(currentViewDate))
    ) {
      onPrev && onPrev()
    } else if (
      navigableBeforeAndAfterDates &&
      afterDates(date, endOfMonthDate(currentViewDate))
    ) {
      onNext && onNext()
    }
    selectFn(date, selected)
  }
  const isMonthView = currentView === MONTH

  let data
  switch (currentView) {
    case MONTH:
      data = (
        <MonthView
          calendarType={calendarType}
          currentViewDate={currentViewDate}
          weekends={weekends}
          onDateSelected={onDateSelected}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          availableDates={availableDates}
          selectedDates={selectedDates}
          selectedDate={selectedDate}
          selectHandler={selectHandler}
          hideBeforeAndAfterDates={hideBeforeAndAfterDates}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        />
      )
      break
    case YEAR:
      data = (
        <YearView
          disableableYearTiles={disableableYearTiles}
          availableDates={availableDates}
          minDate={minDate}
          maxDate={maxDate}
          onDrillDown={onDrillDown}
          locale={locale}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        />
      )
      break
    case DECADE:
      data = (
        <DecadeView
          disableableDecadeTiles={disableableDecadeTiles}
          availableDates={availableDates}
          minDate={minDate}
          maxDate={maxDate}
          onDrillDown={onDrillDown}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        />
      )
      break
    case CENTURY:
      data = (
        <CenturyView
          disableableCenturyTiles={disableableCenturyTiles}
          availableDates={availableDates}
          minDate={minDate}
          maxDate={maxDate}
          onDrillDown={onDrillDown}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        />
      )
      break

    default:
      break
  }
  return (
    <div className={`grid${isMonthView ? ' grid-dates' : ' grid-months'}`}>
      {data}
    </div>
  )
}

CalendarView.defaultProps = {
  locale: 'en',
  calendarType: 'ISO 8601'
}

CalendarView.propTypes = {
  onDrillDown: PropTypes.func.isRequired,
  onMultiSelect: PropTypes.func.isRequired,
  onSingleSelect: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDateSelected: PropTypes.func,
  currentViewDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  calendarType: PropTypes.string,
  weekends: PropTypes.bool,
  multiSelect: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  selectedDate: PropTypes.instanceOf(Date),
  disableableYearTiles: PropTypes.bool,
  disableableDecadeTiles: PropTypes.bool,
  disableableCenturyTiles: PropTypes.bool,
  navigableBeforeAndAfterDates: PropTypes.bool,
  hideBeforeAndAfterDates: PropTypes.bool,
  onMouseEnterTile: PropTypes.func,
  onMouseLeaveTile: PropTypes.func
}

export default CalendarView
