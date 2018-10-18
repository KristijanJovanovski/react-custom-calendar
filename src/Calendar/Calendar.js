import './Calendar.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CalendarView from './ui/CalendarView'
import Header from './ui/Header'
import Navigation from './ui/Navigation'
import { CENTURY, DECADE, MONTH, YEAR } from './utils/constants'
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
    startView: MONTH,
    startViewDate: new Date(),
    minView: MONTH,
    maxView: CENTURY,
    locale: 'en',
    calendarType: 'US'
  }
  static propTypes = {
    classNames: PropTypes.string,
    locale: PropTypes.string,
    weekends: PropTypes.bool,
    calendarType: PropTypes.string,
    onDateSelected: PropTypes.func,
    onMultiSelect: PropTypes.func,
    multiSelect: PropTypes.bool,
    startViewDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    maxView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    startView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
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
    nextClasses: PropTypes.string,
    doubleNextClasses: PropTypes.string,
    disableableYearTiles: PropTypes.bool,
    disableableDecadeTiles: PropTypes.bool,
    disableableCenturyTiles: PropTypes.bool,
    navigableBeforeAndAfterDates: PropTypes.bool,
    hideBeforeAndAfterDates: PropTypes.bool,
    onMouseEnterTile: PropTypes.func,
    onMouseLeaveTile: PropTypes.func
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // before first render
    let state = null
    if (prevState.currentViewDate === undefined) {
      nextProps.startViewDate && checkDate(nextProps.startViewDate)
      nextProps.minDate && checkDate(nextProps.minDate)
      nextProps.maxDate && checkDate(nextProps.maxDate)
      nextProps.minDate &&
        nextProps.maxDate &&
        checkMinMaxDate(nextProps.minDate, nextProps.maxDate)
      nextProps.disabledDates &&
        nextProps.disabledDates.forEach(date => {
          checkDate(date)
        })
      nextProps.availableDates &&
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
        nextProps.minView &&
        nextProps.maxView &&
        !checkViewOrder(nextProps.minView, nextProps.maxView) &&
        !checkViewOrder(nextProps.minView, nextProps.startView) &&
        !checkViewOrder(nextProps.startView, nextProps.maxView)
      ) {
        throw new Error(
          'startView value shoud be beetween or equal to minView and maxView'
        )
      }
      state = {
        ...prevState,
        ...state,
        selectedDates: [...prevState.selectedDates],
        currentView: nextProps.startView
      }
    }

    return state
  }

  handleDrillUp = () => {
    const currentView = this.state.currentView
    const maxView = this.props.maxView
    switch (currentView) {
      case MONTH:
        checkViewOrder(currentView, maxView) &&
          this.setState({ currentView: YEAR })
        break
      case YEAR:
        checkViewOrder(currentView, maxView) &&
          this.setState({ currentView: DECADE })
        break
      case DECADE:
        checkViewOrder(currentView, maxView) &&
          this.setState({ currentView: CENTURY })
        break

      default:
        break
    }
  }
  handleDrillDown = idx => {
    const { currentView, currentViewDate } = this.state
    const minView = this.props.minView
    let newDate
    switch (currentView) {
      case YEAR:
        newDate = getNewDate(currentViewDate, MONTH, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: MONTH, currentViewDate: newDate })
        break
      case DECADE:
        newDate = getNewDate(currentViewDate, YEAR, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: YEAR, currentViewDate: newDate })
        break
      case CENTURY:
        newDate = getNewDate(currentViewDate, DECADE, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: DECADE, currentViewDate: newDate })
        break
      default:
        break
    }
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
    const { onMultiSelect } = this.props
    const selectedDates = this.state.selectedDates
    let newSelectedDates
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
  handleSingleSelect = (date, selected) => {
    if (selected) {
      this.setState({ selectedDate: date })
    } else {
      this.setState({ selectedDate: undefined })
    }
  }

  render() {
    const {
      selectedDate,
      selectedDates,
      currentView,
      currentViewDate
    } = this.state
    const {
      classNames,
      onDateSelected,
      weekends,
      minDate,
      maxDate,
      disabledDates,
      availableDates,
      multiSelect,
      navigationDisabled,
      prevDisabled,
      nextDisabled,
      doublePrevDisabled,
      doubleNextDisabled,
      navigationHidden,
      disableableYearTiles,
      disableableDecadeTiles,
      disableableCenturyTiles,
      hideBeforeAndAfterDates,
      navigableBeforeAndAfterDates,
      onMouseEnterTile,
      onMouseLeaveTile
    } = this.props
    const monthView = currentView === MONTH
    const locale = this.props.locale
    const calendarType = this.props.calendarType

    return (
      <div className={`calendar${classNames ? ' ' + classNames : ''}`}>
        <Navigation
          locale={locale}
          currentView={currentView}
          currentViewDate={currentViewDate}
          drillUp={this.handleDrillUp}
          onPrev={this.handlePrev}
          onNext={this.handleNext}
          onDoublePrev={this.handleDoublePrev}
          onDoubleNext={this.handleDoubleNext}
          navigationDisabled={navigationDisabled}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
          doublePrevDisabled={doublePrevDisabled}
          doubleNextDisabled={doubleNextDisabled}
          navigationHidden={navigationHidden}
        />
        {monthView && <Header calendarType={calendarType} locale={locale} />}
        <CalendarView
          currentView={currentView}
          calendarType={calendarType}
          currentViewDate={currentViewDate}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          selectedDate={selectedDate}
          selectedDates={selectedDates}
          disabledDates={disabledDates}
          availableDates={availableDates}
          multiSelect={multiSelect}
          weekends={weekends}
          onDrillDown={this.handleDrillDown}
          onMultiSelect={this.handleMultiSelect}
          onSingleSelect={this.handleSingleSelect}
          onDateSelected={onDateSelected}
          onPrev={this.handlePrev}
          onNext={this.handleNext}
          disableableYearTiles={disableableYearTiles}
          disableableDecadeTiles={disableableDecadeTiles}
          disableableCenturyTiles={disableableCenturyTiles}
          navigableBeforeAndAfterDates={navigableBeforeAndAfterDates}
          hideBeforeAndAfterDates={hideBeforeAndAfterDates}
          onMouseEnterTile={onMouseEnterTile}
          onMouseLeaveTile={onMouseLeaveTile}
        />
      </div>
    )
  }
}

export default Calendar
