import React from 'react'

import {
  getDateRange,
  isDateDisabled,
  isMonthDisabled,
  isYearDisabled,
  isDecadeDisabled,
  getMonthRange,
  getYearRange,
  getDecadeRange
} from '../utils/helpers'
import { MONTH, YEAR, DECADE, CENTURY } from '../utils/constants'
export default class RangeHover extends React.Component {
  state = {
    hoverDates: []
  }
  handleHover = (hoverDate, hover) => {
    const {
      selectedDate,
      availableDates,
      disabledDates,
      minDate,
      maxDate,
      currentView,
      range
    } = this.props
    if (range) {
      if (selectedDate && hover) {
        let isDisabledFn
        let hoverRangeDates
        if (currentView === MONTH) {
          isDisabledFn = isDateDisabled
          hoverRangeDates = getDateRange(selectedDate, hoverDate)
        } else if (currentView === YEAR) {
          isDisabledFn = isMonthDisabled
          hoverRangeDates = getMonthRange(selectedDate, hoverDate)
        } else if (currentView === DECADE) {
          isDisabledFn = isYearDisabled
          hoverRangeDates = getYearRange(selectedDate, hoverDate)
        } else if (currentView === CENTURY) {
          isDisabledFn = isDecadeDisabled
          hoverRangeDates = getDecadeRange(selectedDate, hoverDate)
        }
        const hoverDates = hoverRangeDates.filter(hoverRangeDateItem => {
          return !isDisabledFn(
            hoverRangeDateItem,
            availableDates,
            minDate,
            maxDate,
            disabledDates
          )
        })
        this.setState({ hoverDates })
      } else if (!selectedDate && hover) {
        this.setState({ hoverDates: [] })
      }
    }
  }
  render() {
    const { ...rest } = this.props
    return (
      <>
        {this.props.children(
          [...this.state.hoverDates],
          this.handleHover,
          rest
        )}
      </>
    )
  }
}
