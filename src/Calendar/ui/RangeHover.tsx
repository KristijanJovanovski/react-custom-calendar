import React from 'react'

import { CALENDAR_TYPE, DATE_TYPES, DAYS } from '../utils/constants'
import {
  getDateRange,
  getDecadeRange,
  getMonthRange,
  getYearRange,
  isDateDisabled,
  isDecadeDisabled,
  isMonthDisabled,
  isYearDisabled
} from '../utils/helpers'

export default class RangeHover extends React.Component<
  IRangeHoverProps,
  IState
> {
  state: IState = {
    hoverDates: []
  }
  handleHover = (hoverDate: Date | null, hover: boolean) => {
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
      if (selectedDate && hover && hoverDate) {
        let isDisabledFn: Function
        let hoverRangeDates: Date[] = []
        if (currentView === DATE_TYPES.MONTH) {
          isDisabledFn = isDateDisabled
          hoverRangeDates = getDateRange(selectedDate, hoverDate)
        } else if (currentView === DATE_TYPES.YEAR) {
          isDisabledFn = isMonthDisabled
          hoverRangeDates = getMonthRange(selectedDate, hoverDate)
        } else if (currentView === DATE_TYPES.DECADE) {
          isDisabledFn = isYearDisabled
          hoverRangeDates = getYearRange(selectedDate, hoverDate)
        } else if (currentView === DATE_TYPES.CENTURY) {
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
    const { children, ...rest } = this.props
    return (
      <>
        {/* { children([...this.state.hoverDates] })} */}
        {this.props.children(
          [...this.state.hoverDates],
          this.handleHover,
          rest
        )}
      </>
    )
  }
}
type IState = {
  hoverDates: Date[]
}
export type IRangeHoverProps = {
  children: (
    hoverDates: Date[],
    onHover: (hoverDate: Date | null, hover: boolean) => void,
    rest: any
  ) => React.ReactNode
  calendarType: CALENDAR_TYPE
  range?: boolean
  disableWeekdays?: DAYS[]
  weekends?: boolean
  minDate?: Date
  maxDate?: Date
  currentViewDate: Date
  currentView: DATE_TYPES
  disabledDates?: Date[]
  availableDates?: Date[]
  selectedDates?: Date[]
  selectedDate?: Date
  hideBeforeAndAfterDates?: boolean
  hoverDates?: Date[]
  tileClasses?: string
  disableableYearTiles?: boolean
  disableableDecadeTiles?: boolean
  disableableCenturyTiles?: boolean
  locale?: string
  onDateSelected?: (date: Date, selected: boolean) => void
  selectHandler: (date: Date, selected: boolean) => void
  onMouseEnterTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onMouseLeaveTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
}
