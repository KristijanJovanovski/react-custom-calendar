import './Calendar.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Grid from './ui/Grid'
import Header from './ui/Header'
import Navigation from './ui/Navigation'
import {
  getDoubleNextDate,
  getDoublePrevDate,
  getNewDate,
  getNextDate,
  getPrevDate
} from './utils/helpers'

class Calendar extends Component {
  state = {
    currentView: 'Month',
    currentStartDate: new Date(),
    selectedDates: []
  }

  handleDrillUp = () => {
    const currentView = this.state.currentView
    switch (currentView) {
      case 'Month':
        this.setState({ currentView: 'Year' })
        break

      default:
        break
    }
  }
  handleDrillDown = (idx, type) => {
    const { currentView, currentStartDate } = this.state
    switch (currentView) {
      case 'Year':
        const newDate = getNewDate(currentStartDate, type, idx)
        this.setState({ currentView: 'Month', currentStartDate: newDate })
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

  render() {
    const { currentStartDate, currentView } = this.state
    const { classNames, onDateSelected, weekends } = this.props
    const monthView = currentView === 'Month'
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
        />
        {monthView && <Header calendarType={calendarType} locale={locale} />}
        <Grid
          currentView={currentView}
          calendarType={calendarType}
          currentStartDate={currentStartDate}
          locale={locale}
          weekends={weekends}
          onDrillDown={this.handleDrillDown}
          onDateSelected={onDateSelected}
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
  onDateSelected: PropTypes.func
}
export default Calendar
