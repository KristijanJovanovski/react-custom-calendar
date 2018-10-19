import './CalendarView.css'

import PropTypes from 'prop-types'
import React from 'react'

import { CENTURY, DECADE, MONTH, YEAR, DATE } from '../utils/constants'
import {
  afterDates,
  beforeDates,
  endOfMonthDate,
  equalDates,
  firstOfMonthDate,
  getDateRange,
  getChildView,
  checkViewOrder,
  isDateDisabled,
  isMonthDisabled,
  isYearDisabled,
  isDecadeDisabled
} from '../utils/helpers'
import CenturyView from './CenturyView'
import DecadeView from './DecadeView'
import Header from './Header'
import MonthView from './MonthView'
import Navigation from './Navigation'
import RangeHover from './RangeHover'
import YearView from './YearView'

const CalendarView = ({
  locale,
  calendarType,
  currentView,
  minView,
  maxView,
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
  range,
  drillUp,
  onDoublePrev,
  onDoubleNext,
  navigationDisabled,
  prevDisabled,
  nextDisabled,
  doublePrevDisabled,
  doubleNextDisabled,
  navigationHidden,
  navigationClasses,
  doublePrevClasses,
  prevClasses,
  labelClasses,
  nextClasses,
  doubleNextClasses
}) => {
  const selectHandler = (date, selected) => {
    const drillView = getChildView(currentView, minView)
    if (drillView) {
      onDrillDown(date, drillView)
      return
    }
    const selectFn = multiSelect ? onMultiSelect : onSingleSelect

    if (
      navigableBeforeAndAfterDates &&
      currentView === MONTH &&
      beforeDates(date, firstOfMonthDate(currentViewDate))
    ) {
      onPrev && onPrev()
    } else if (
      navigableBeforeAndAfterDates &&
      currentView === MONTH &&
      afterDates(date, endOfMonthDate(currentViewDate))
    ) {
      onNext && onNext()
    }
    if (!range) {
      selectFn(date, selected)
    } else if (selectedDate && !equalDates(selectedDate, date)) {
      onSingleSelect(date, false)
      let selectedRange
      let isDisabledFn
      if (currentView === MONTH) {
        isDisabledFn = isDateDisabled
        selectedRange = [...getDateRange(selectedDate, date, DATE)]
      } else if (currentView === YEAR) {
        isDisabledFn = isMonthDisabled
        selectedRange = [...getDateRange(selectedDate, date, MONTH)]
      } else if (currentView === DECADE) {
        isDisabledFn = isYearDisabled
        selectedRange = [...getDateRange(selectedDate, date, YEAR)]
      } else if (currentView === CENTURY) {
        isDisabledFn = isDecadeDisabled
        selectedRange = [...getDateRange(selectedDate, date, DECADE)]
      }
      selectedRange = selectedRange.filter(selectedRangeDateItem => {
        return !isDisabledFn(
          selectedRangeDateItem,
          availableDates,
          minDate,
          maxDate,
          disabledDates
        )
      })
      onRangeSelect(selectedRange, selected)
    } else if (selectedDates.length) {
      onRangeSelect([], false)
    } else {
      onSingleSelect(date, selected)
    }
  }
  const isMonthView = currentView === MONTH

  let gridView
  switch (currentView) {
    case MONTH:
      gridView = (
        <RangeHover
          currentView={currentView}
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
        >
          {(hoverDates, onHover, rest) => (
            <MonthView hoverDates={hoverDates} onHover={onHover} {...rest} />
          )}
        </RangeHover>
      )

      break

    case YEAR:
      gridView = (
        <RangeHover
          range={range}
          currentView={currentView}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          availableDates={availableDates}
          selectedDates={selectedDates}
          selectedDate={selectedDate}
          selectHandler={selectHandler}
          disableableYearTiles={disableableYearTiles}
          locale={locale}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        >
          {(hoverDates, onHover, rest) => (
            <YearView hoverDates={hoverDates} onHover={onHover} {...rest} />
          )}
        </RangeHover>
      )

      break
    case DECADE:
      gridView = (
        <RangeHover
          range={range}
          currentView={currentView}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          availableDates={availableDates}
          selectedDate={selectedDate}
          selectedDates={selectedDates}
          selectHandler={selectHandler}
          disableableDecadeTiles={disableableDecadeTiles}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        >
          {(hoverDates, onHover, rest) => (
            <DecadeView hoverDates={hoverDates} onHover={onHover} {...rest} />
          )}
        </RangeHover>
      )

      break
    case CENTURY:
      gridView = (
        <RangeHover
          range={range}
          currentView={currentView}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          availableDates={availableDates}
          selectedDate={selectedDate}
          selectedDates={selectedDates}
          selectHandler={selectHandler}
          disableableCenturyTiles={disableableCenturyTiles}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        >
          {(hoverDates, onHover, rest) => (
            <CenturyView hoverDates={hoverDates} onHover={onHover} {...rest} />
          )}
        </RangeHover>
      )

      break

    default:
      break
  }
  const nav = (
    <Navigation
      locale={locale}
      currentView={currentView}
      currentViewDate={currentViewDate}
      drillUp={drillUp}
      onPrev={onPrev}
      onNext={onNext}
      onDoublePrev={onDoublePrev}
      onDoubleNext={onDoubleNext}
      navigationDisabled={navigationDisabled}
      prevDisabled={prevDisabled}
      nextDisabled={nextDisabled}
      doublePrevDisabled={doublePrevDisabled}
      doubleNextDisabled={doubleNextDisabled}
      navigationHidden={navigationHidden}
      navigationClasses={navigationClasses}
      doublePrevClasses={doublePrevClasses}
      prevClasses={prevClasses}
      labelClasses={labelClasses}
      nextClasses={nextClasses}
      doubleNextClasses={doubleNextClasses}
    />
  )
  const header = isMonthView ? (
    <Header calendarType={calendarType} locale={locale} />
  ) : null
  return (
    <>
      {nav}
      {header}
      <div className={`grid${isMonthView ? ' grid-dates' : ' grid-months'}`}>
        {gridView}
      </div>
    </>
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
