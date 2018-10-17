import './Calendar.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Grid from './ui/Grid'
import Header from './ui/Header'
import Navigation from './ui/Navigation'
import { MONTH, YEAR, DECADE, CENTURY } from './utils/constants'
import {
  checkDate,
  checkMinMaxDate,
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

  handleDrillUp = () => {
    const currentView = this.state.currentView
    switch (currentView) {
      case MONTH:
        this.setState({ currentView: YEAR })
        break
      case YEAR:
        this.setState({ currentView: DECADE })
        break
      case DECADE:
        this.setState({ currentView: CENTURY })
        break

      default:
        break
    }
  }
  handleDrillDown = idx => {
    const { currentView, currentStartDate } = this.state
    let newDate
    switch (currentView) {
      case YEAR:
        newDate = getNewDate(currentStartDate, MONTH, idx)
        this.setState({ currentView: MONTH, currentStartDate: newDate })
        break
      case DECADE:
        newDate = getNewDate(currentStartDate, YEAR, idx)
        this.setState({ currentView: YEAR, currentStartDate: newDate })
        break
      case CENTURY:
        newDate = getNewDate(currentStartDate, DECADE, idx)
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
    const selectedDates = this.state.selectedDates
    if (selected) {
      this.setState({ selectedDates: [...selectedDates, date] })
    } else {
      const index = selectedDates.findIndex(stateDate =>
        equalDates(stateDate, date)
      )
      this.setState({
        selectedDates: [
          ...selectedDates.slice(0, index),
          ...selectedDates.slice(index + 1)
        ]
      })
    }
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
      navigationHidden
    } = this.props
    const monthView = currentView === MONTH
    const locale = this.props.locale || 'en'
    const calendarType = this.props.calendarType || 'ISO 8601'

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
        <Grid
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
        />
      </div>
    )
  }
}

Calendar.propTypes = {
  classNames: PropTypes.string,
  locale: PropTypes.string,
  weekends: PropTypes.bool,
  calendarType: PropTypes.string,
  onDateSelected: PropTypes.func,
  multiSelect: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
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
  doubleNextClasses: PropTypes.string
}
export default Calendar
