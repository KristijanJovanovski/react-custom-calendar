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
    currentView: MONTH,
    currentStartDate: new Date(),
    selectedDates: [],
    selectedDate: undefined
  }
  static defaultProps = {
    // currentView: MONTH,
    minView: MONTH,
    maxView: CENTURY
  }
  static propTypes = {
    classNames: PropTypes.string,
    locale: PropTypes.string,
    weekends: PropTypes.bool,
    calendarType: PropTypes.string,
    onDateSelected: PropTypes.func,
    onMultiSelect: PropTypes.func,
    multiSelect: PropTypes.bool,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    maxView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
    // currentView: PropTypes.oneOf([MONTH, YEAR, DECADE, CENTURY]),
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

  componentDidMount() {
    const {
      minDate,
      maxDate,
      disabledDates,
      availableDates,
      maxView,
      minView
    } = this.props
    minDate && !maxDate && checkDate(minDate)
    maxDate && !minDate && checkDate(maxDate)
    minDate && maxDate && checkMinMaxDate(minDate, maxDate)
    disabledDates &&
      disabledDates.forEach(date => {
        checkDate(date)
      })
    availableDates &&
      availableDates.forEach(date => {
        checkDate(date)
      })

    minView && checkView(minView)
    maxView && checkView(maxView)
    if (minView && maxView && !checkViewOrder(minView, maxView)) {
      throw new Error('minView should lower than maxView')
    }
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
    const { currentView, currentStartDate } = this.state
    const minView = this.props.minView
    let newDate
    switch (currentView) {
      case YEAR:
        newDate = getNewDate(currentStartDate, MONTH, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: MONTH, currentStartDate: newDate })
        break
      case DECADE:
        newDate = getNewDate(currentStartDate, YEAR, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: YEAR, currentStartDate: newDate })
        break
      case CENTURY:
        newDate = getNewDate(currentStartDate, DECADE, idx)
        checkViewOrder(minView, currentView) &&
          this.setState({ currentView: DECADE, currentStartDate: newDate })
        break
      default:
        break
    }
  }
  handlePrev = () => {
    const { currentView, currentStartDate } = this.state
    const newDate = getPrevDate(currentStartDate, currentView)
    this.setState({ currentStartDate: newDate })
  }
  handleNext = () => {
    const { currentView, currentStartDate } = this.state
    const newDate = getNextDate(currentStartDate, currentView)
    this.setState({ currentStartDate: newDate })
  }
  handleDoublePrev = () => {
    const { currentView, currentStartDate } = this.state
    const newDate = getDoublePrevDate(currentStartDate, currentView)
    this.setState({ currentStartDate: newDate })
  }
  handleDoubleNext = () => {
    const { currentView, currentStartDate } = this.state
    const newDate = getDoubleNextDate(currentStartDate, currentView)
    this.setState({ currentStartDate: newDate })
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
      currentStartDate,
      currentView,
      selectedDate,
      selectedDates
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
    const locale = this.props.locale || 'en'
    const calendarType = this.props.calendarType || 'ISO 8601'

    return (
      <div className={`calendar${classNames ? ' ' + classNames : ''}`}>
        <Navigation
          locale={locale}
          currentView={currentView}
          currentStartDate={currentStartDate}
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
          currentStartDate={currentStartDate}
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
