import './CalendarView.css';

import React, { SFC } from 'react';

import { CALENDAR_TYPE, CENTURY, DATE, DATE_TYPES, DAYS, DECADE, ISO_8601, MONTH, YEAR } from '../utils/constants';
import {
  afterDates,
  beforeDates,
  endOfMonthDate,
  equalDates,
  firstOfMonthDate,
  getChildView,
  getDateRange,
  isDateDisabled,
  isDecadeDisabled,
  isMonthDisabled,
  isYearDisabled,
} from '../utils/helpers';
import CenturyView from './CenturyView';
import DecadeView from './DecadeView';
import Header from './Header';
import MonthView from './MonthView';
import Navigation from './Navigation';
import RangeHover from './RangeHover';
import TimeView from './TimeView';
import YearView from './YearView';

const CalendarView: SFC<ICalendarView> = ({
  withTime,
  classNames,
  locale,
  calendarType,
  currentView,
  minView,
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
  doubleNextClasses,
  doubleNextLabel,
  nextLabel,
  prevLabel,
  doublePrevLabel,
  navLabelShortFormat,
  tileClasses,
  headerClasses,
  disableWeekdays,
  hourLabel,
  hourTileClasses,
  hourHeaderClasses,
  hourListClasses,
  hourFormat,
  minuteLabel,
  minuteTileClasses,
  minuteHeaderClasses,
  minuteListClasses,
  minuteStep
}: ICalendarView) => {
  const onTimeSelected = (date: Date) => {
    onSingleSelect(date, true)
    onDateSelected && onDateSelected(date, true)
  }
  const selectHandler = (date: Date, selected: boolean) => {
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
      let selectedRange: Date[] = []
      let isDisabledFn: Function
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
    } else if (selectedDates && selectedDates.length) {
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
          disableWeekdays={disableWeekdays}
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
          tileClasses={tileClasses}
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
          disableWeekdays={disableWeekdays}
          range={range}
          currentView={currentView}
          calendarType={calendarType}
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
          tileClasses={tileClasses}
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
          disableWeekdays={disableWeekdays}
          range={range}
          currentView={currentView}
          calendarType={calendarType}
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
          tileClasses={tileClasses}
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
          disableWeekdays={disableWeekdays}
          range={range}
          currentView={currentView}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          calendarType={calendarType}
          availableDates={availableDates}
          selectedDate={selectedDate}
          selectedDates={selectedDates}
          selectHandler={selectHandler}
          disableableCenturyTiles={disableableCenturyTiles}
          currentViewDate={currentViewDate}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
          tileClasses={tileClasses}
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
      doubleNextLabel={doubleNextLabel}
      nextLabel={nextLabel}
      prevLabel={prevLabel}
      doublePrevLabel={doublePrevLabel}
      navLabelShortFormat={navLabelShortFormat}
    />
  )
  const header = isMonthView ? (
    <Header
      calendarType={calendarType}
      locale={locale}
      headerClasses={headerClasses}
    />
  ) : null
  const calendarWrapperClasses = `calendar${
    classNames ? ' ' + classNames : ''
  }${
    isMonthView && withTime && !range && !multiSelect && selectedDate
      ? ' calendar-with-time'
      : ''
  }`
  return (
    <div className={calendarWrapperClasses}>
      <div className={'calendar-container'}>
        {nav}
        {header}
        <div className={`grid${isMonthView ? ' grid-dates' : ' grid-months'}`}>
          {gridView}
        </div>
      </div>
      {isMonthView &&
        withTime &&
        !range &&
        !multiSelect &&
        selectedDate && (
          <TimeView
            selectedDate={selectedDate}
            onTimeSelected={onTimeSelected}
            hourLabel={hourLabel}
            hourTileClasses={hourTileClasses}
            hourHeaderClasses={hourHeaderClasses}
            hourListClasses={hourListClasses}
            hourFormat={hourFormat}
            minuteLabel={minuteLabel}
            minuteTileClasses={minuteTileClasses}
            minuteHeaderClasses={minuteHeaderClasses}
            minuteListClasses={minuteListClasses}
            minuteStep={minuteStep}
          />
        )}
    </div>
  )
}

CalendarView.defaultProps = {
  locale: 'en',
  calendarType: ISO_8601
}

export type ICalendarView = {
  classNames?: string
  withTime?: boolean
  locale?: string
  calendarType: CALENDAR_TYPE
  currentView: DATE_TYPES
  minView: DATE_TYPES
  maxView: DATE_TYPES
  currentViewDate: Date
  weekends?: boolean
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  availableDates?: Date[]
  selectedDates?: Date[]
  selectedDate?: Date
  multiSelect?: boolean
  disableableYearTiles?: boolean
  disableableDecadeTiles?: boolean
  disableableCenturyTiles?: boolean
  navigableBeforeAndAfterDates?: boolean
  hideBeforeAndAfterDates?: boolean
  range?: boolean
  navigationDisabled?: boolean
  prevDisabled?: boolean
  nextDisabled?: boolean
  doublePrevDisabled?: boolean
  doubleNextDisabled?: boolean
  navigationHidden?: boolean
  navigationClasses?: string
  doublePrevClasses?: string
  prevClasses?: string
  labelClasses?: string
  nextClasses?: string
  doubleNextClasses?: string
  doubleNextLabel?: string
  nextLabel?: string
  prevLabel?: string
  doublePrevLabel?: string
  navLabelShortFormat?: boolean
  tileClasses?: string
  headerClasses?: string
  disableWeekdays?: DAYS[]
  hourLabel?: string
  hourTileClasses?: string
  hourHeaderClasses?: string
  hourListClasses?: string
  hourFormat?: CALENDAR_TYPE
  minuteLabel?: string
  minuteTileClasses?: string
  minuteHeaderClasses?: string
  minuteListClasses?: string
  minuteStep?: number
  onMultiSelect: (date: Date, selected: boolean) => void
  onDateSelected?: (date: Date, selected: boolean) => void
  onRangeSelect: (dates: Date[], selected: boolean) => void
  onSingleSelect: (date: Date, selected: boolean) => void
  onMouseEnterTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onMouseLeaveTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onDrillDown: (date: Date, view: DATE_TYPES) => void
  drillUp: () => void
  onPrev: () => void
  onNext: () => void
  onDoublePrev: () => void
  onDoubleNext: () => void
}

export default CalendarView
