import './Calendar.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CalendarView from './ui/CalendarView'
import {
  CENTURY,
  DECADE,
  MONTH,
  YEAR,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
  US,
  ISO_8601
} from './utils/constants'
import {
  checkDate,
  checkMinMaxDate,
  checkView,
  checkViewOrder,
  equalDates,
  getDoubleNextDate,
  getDoublePrevDate,
  getNewDate,
  getNextDate,
  getPrevDate
} from './utils/helpers'

class Calendar extends Component {
  state = {
    currentView: undefined,
    currentViewDate: undefined,
    selectedDates: [],
    selectedDate: undefined
  }
  static defaultProps = {
    startViewDate: new Date(),
    minView: MONTH,
    maxView: CENTURY,
    locale: 'en',
    calendarType: US
  }
  static propTypes = {
    classNames: PropTypes.string,
    withTime: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date),
    selectedDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    locale: PropTypes.string,
    weekends: PropTypes.bool,
    calendarType: PropTypes.oneOf([US, ISO_8601]),
    onDateSelected: PropTypes.func,
    onMultiSelect: PropTypes.func,
    onRangeMultiSelect: PropTypes.func,
    multiSelect: PropTypes.bool,
    range: PropTypes.bool,
    startViewDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    maxView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    startView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    disableWeekdays: PropTypes.arrayOf(
      PropTypes.oneOf([
        SUNDAY,
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY
      ])
    ),
    navigationDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    doublePrevDisabled: PropTypes.bool,
    doubleNextDisabled: PropTypes.bool,
    navigationHidden: PropTypes.bool,
    navigationClasses: PropTypes.string,
    doublePrevClasses: PropTypes.string,
    prevClasses: PropTypes.string,
    labelClasses: PropTypes.string,
    doubleNextLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    prevLabel: PropTypes.string,
    doublePrevLabel: PropTypes.string,
    nextClasses: PropTypes.string,
    doubleNextClasses: PropTypes.string,
    navLabelShortFormat: PropTypes.bool,
    disableableYearTiles: PropTypes.bool,
    disableableDecadeTiles: PropTypes.bool,
    disableableCenturyTiles: PropTypes.bool,
    navigableBeforeAndAfterDates: PropTypes.bool,
    hideBeforeAndAfterDates: PropTypes.bool,
    onMouseEnterTile: PropTypes.func,
    onMouseLeaveTile: PropTypes.func,
    tileClasses: PropTypes.string,
    headerClasses: PropTypes.string,
    freezeSelection: PropTypes.bool,
    hourLabel: PropTypes.string,
    hourTileClasses: PropTypes.string,
    hourHeaderClasses: PropTypes.string,
    hourListClasses: PropTypes.string,
    hourFormat: PropTypes.oneOf([US, ISO_8601]),
    minuteLabel: PropTypes.string,
    minuteTileClasses: PropTypes.string,
    minuteHeaderClasses: PropTypes.string,
    minuteListClasses: PropTypes.string,
    minuteStep: PropTypes.number
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = null
    if (prevState.currentViewDate === undefined) {
      nextProps.startViewDate && checkDate(nextProps.startViewDate)
      nextProps.minDate && checkDate(nextProps.minDate)
      nextProps.maxDate && checkDate(nextProps.maxDate)
      nextProps.minDate &&
        nextProps.maxDate &&
        checkMinMaxDate(nextProps.minDate, nextProps.maxDate)
      nextProps.disabledDates &&
        Array.isArray(nextProps.disabledDates) &&
        nextProps.disabledDates.forEach(date => {
          checkDate(date)
        })
      nextProps.availableDates &&
        Array.isArray(nextProps.availableDates) &&
        nextProps.availableDates.forEach(date => {
          checkDate(date)
        })

      state = {
        ...prevState,
        ...state,
        selectedDates: [...prevState.selectedDates],
        currentViewDate: nextProps.startViewDate
      }
    }
    // before first render
    if (prevState.currentView === undefined) {
      nextProps.startView && checkView(nextProps.startView)
      nextProps.minView && checkView(nextProps.minView)
      nextProps.maxView && checkView(nextProps.maxView)

      if (
        nextProps.minView &&
        nextProps.maxView &&
        !checkViewOrder(nextProps.minView, nextProps.maxView)
      ) {
        throw new Error('minView should lower than maxView')
      }

      if (
        (nextProps.minView &&
          nextProps.maxView &&
          !checkViewOrder(nextProps.minView, nextProps.maxView)) ||
        (nextProps.startView &&
          !checkViewOrder(nextProps.minView, nextProps.startView)) ||
        (nextProps.startView &&
          !checkViewOrder(nextProps.startView, nextProps.maxView))
      ) {
        throw new Error(
          'startView value shoud be beetween or equal to minView and maxView'
        )
      }
      if (!nextProps.startView) {
        state = {
          ...prevState,
          ...state,
          selectedDates: [...prevState.selectedDates],
          currentView: nextProps.minView
        }
      } else {
        state = {
          ...prevState,
          ...state,
          selectedDates: [...prevState.selectedDates],
          currentView: nextProps.startView
        }
      }
    }
    return state
  }
  componentDidMount() {
    const { selectedDate, selectedDates } = this.props
    if (selectedDate) {
      checkDate(selectedDate)
      this.setState({ selectedDate })
    }
    if (selectedDates && Array.isArray(selectedDates)) {
      selectedDates.forEach(selectedDateItem => checkDate(selectedDateItem))
      this.setState({ selectedDates })
    }
  }

  handleDrillUp = () => {
    const { currentView, currentViewDate } = this.state
    const maxView = this.props.maxView
    let newDate
    switch (currentView) {
      case MONTH:
        newDate = getNewDate(currentViewDate, MONTH, 1)
        checkViewOrder(YEAR, maxView) &&
          this.setState({ currentView: YEAR, currentViewDate: newDate })
        break
      case YEAR:
        newDate = getNewDate(currentViewDate, DECADE, 1)
        checkViewOrder(DECADE, maxView) &&
          this.setState({ currentView: DECADE, currentViewDate: newDate })
        break
      case DECADE:
        newDate = getNewDate(currentViewDate, CENTURY, 1)
        checkViewOrder(CENTURY, maxView) &&
          this.setState({ currentView: CENTURY, currentViewDate: newDate })
        break

      default:
        break
    }
  }
  handleDrillDown = (date, view) => {
    this.setState({ currentView: view, currentViewDate: date })
  }
  handlePrev = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getPrevDate(currentViewDate, currentView)
    this.setState({ currentViewDate: newDate })
  }
  handleNext = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getNextDate(currentViewDate, currentView)
    this.setState({ currentViewDate: newDate })
  }
  handleDoublePrev = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getDoublePrevDate(currentViewDate, currentView)
    this.setState({ currentViewDate: newDate })
  }
  handleDoubleNext = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getDoubleNextDate(currentViewDate, currentView)
    this.setState({ currentViewDate: newDate })
  }

  handleMultiSelect = (date, selected) => {
    const { onMultiSelect, freezeSelection } = this.props

    const selectedDates = this.state.selectedDates
    let newSelectedDates
    if (!freezeSelection) {
      if (selected) {
        newSelectedDates = [...selectedDates, date]
        this.setState({ selectedDates: newSelectedDates })
      } else {
        const index = selectedDates.findIndex(stateDate =>
          equalDates(stateDate, date)
        )
        newSelectedDates = [
          ...selectedDates.slice(0, index),
          ...selectedDates.slice(index + 1)
        ]
        this.setState({
          selectedDates: newSelectedDates
        })
      }
      onMultiSelect && onMultiSelect([...newSelectedDates])
    }
  }

  handleRangeSelect = (dates, selected) => {
    const {
      onMultiSelect,
      range,
      onRangeMultiSelect,
      freezeSelection
    } = this.props
    let newSelectedDates
    if (!freezeSelection) {
      if (selected) {
        newSelectedDates = [...dates]
        this.setState({
          selectedDates: [
            newSelectedDates[0],
            newSelectedDates[newSelectedDates.length - 1]
          ]
        })
        range &&
          onRangeMultiSelect &&
          onRangeMultiSelect([
            newSelectedDates[0],
            newSelectedDates[newSelectedDates.length - 1]
          ])
      } else {
        newSelectedDates = []
        range && onRangeMultiSelect && onRangeMultiSelect([])
        this.setState({
          selectedDates: newSelectedDates
        })
      }
      range && onMultiSelect && onMultiSelect([...newSelectedDates])
    }
  }
  handleSingleSelect = (date, selected) => {
    if (!this.props.freezeSelection) {
      if (selected) {
        this.setState({ selectedDate: date })
      } else {
        this.setState({ selectedDate: undefined })
      }
    }
  }

  render() {
    const {
      currentView,
      currentViewDate,
      selectedDate,
      selectedDates
    } = this.state
    const {
      classNames,
      locale,
      weekends,
      calendarType,
      onDateSelected,
      multiSelect,
      range,
      minDate,
      maxDate,
      minView,
      maxView,
      disabledDates,
      availableDates,
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
      doublePrevLabel,
      prevLabel,
      nextLabel,
      doubleNextLabel,
      disableableYearTiles,
      disableableDecadeTiles,
      disableableCenturyTiles,
      navigableBeforeAndAfterDates,
      hideBeforeAndAfterDates,
      onMouseEnterTile,
      onMouseLeaveTile,
      navLabelShortFormat,
      tileClasses,
      headerClasses,
      disableWeekdays,
      withTime,

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
    } = this.props

    return (
      <CalendarView
        classNames={classNames}
        currentView={currentView}
        currentViewDate={currentViewDate}
        selectedDate={selectedDate}
        selectedDates={selectedDates}
        onDrillDown={this.handleDrillDown}
        onRangeSelect={this.handleRangeSelect}
        onMultiSelect={this.handleMultiSelect}
        onSingleSelect={this.handleSingleSelect}
        onDateSelected={onDateSelected}
        drillUp={this.handleDrillUp}
        onPrev={this.handlePrev}
        onNext={this.handleNext}
        onDoublePrev={this.handleDoublePrev}
        onDoubleNext={this.handleDoubleNext}
        locale={locale}
        calendarType={calendarType}
        minView={minView}
        maxView={maxView}
        weekends={weekends}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        availableDates={availableDates}
        multiSelect={multiSelect}
        disableWeekdays={disableWeekdays}
        disableableYearTiles={disableableYearTiles}
        disableableDecadeTiles={disableableDecadeTiles}
        disableableCenturyTiles={disableableCenturyTiles}
        navigableBeforeAndAfterDates={navigableBeforeAndAfterDates}
        hideBeforeAndAfterDates={hideBeforeAndAfterDates}
        onMouseEnterTile={onMouseEnterTile}
        onMouseLeaveTile={onMouseLeaveTile}
        range={range}
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
        labelShortFormat={navLabelShortFormat}
        tileClasses={tileClasses}
        headerClasses={headerClasses}
        withTime={withTime}
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
    )
  }
}

export default Calendar
