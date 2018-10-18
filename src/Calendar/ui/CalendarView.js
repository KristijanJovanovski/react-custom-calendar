import './CalendarView.css'

import PropTypes from 'prop-types'
import React from 'react'

import { CENTURY, DECADE, MONTH, YEAR } from '../utils/constants'
import {
  afterDates,
  beforeDates,
  endOfMonthDate,
  equalDates,
  firstOfMonthDate,
  getDateRange
} from '../utils/helpers'
import CenturyView from './CenturyView'
import DecadeView from './DecadeView'
import MonthView from './MonthView'
import RangeHover from './RangeHover'
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
  onRangeSelect,
  onSingleSelect,
  onPrev,
  onNext,
  disableableYearTiles,
  disableableDecadeTiles,
  disableableCenturyTiles,
  navigableBeforeAndAfterDates,
  hideBeforeAndAfterDates,
  onMouseEnterTile,
  onMouseLeaveTile,
  range
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
    if (!range) {
      selectFn(date, selected)
    } else if (selectedDate && !equalDates(selectedDate, date)) {
      onSingleSelect(date, false)
      onRangeSelect([...getDateRange(selectedDate, date)], selected)
    } else if (selectedDates.length) {
      onRangeSelect([], false)
    } else {
      onSingleSelect(date, selected)
    }
  }
  const isMonthView = currentView === MONTH

  let data
  switch (currentView) {
    case MONTH:
      if (range) {
        data = (
          <RangeHover selectedDate={selectedDate}>
            {(hoverDates, onHover) => (
              <MonthView
                range={range}
                hoverDates={hoverDates}
                onHover={onHover}
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
            )}
          </RangeHover>
        )
      } else {
        data = (
          <MonthView
            range={range}
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
      }
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
    <div
      className={`grid${isMonthView ? ' grid-dates' : ' grid-months'} range`}
    >
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
  onRangeSelect: PropTypes.func.isRequired,
  onMultiSelect: PropTypes.func.isRequired,
  onSingleSelect: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDateSelected: PropTypes.func,
  currentViewDate: PropTypes.instanceOf(Date).isRequired,
  locale: PropTypes.string,
  calendarType: PropTypes.oneOf(['US', 'ISO 8601']),
  weekends: PropTypes.bool,
  multiSelect: PropTypes.bool,
  range: PropTypes.bool,
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
