import './Calendar.css'

import React, { Component } from 'react'

import CalendarView from './ui/CalendarView'
import {
  CALENDAR_TYPE,
  CENTURY,
  DATE_TYPES,
  DAYS,
  DECADE,
  MONTH,
  US,
  YEAR,
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
  getPrevDate,
} from './utils/helpers'

class Calendar extends Component<ICalendarProps, ICalendarState> {
  state: ICalendarState = {
    currentView: undefined,
    currentViewDate: undefined,
    selectedDates: [],
    selectedDate: undefined,
  }
  static defaultProps: Partial<ICalendarProps> = {
    startViewDate: new Date(),
    minView: MONTH,
    maxView: CENTURY,
    locale: 'en',
    calendarType: US,
  }

  static getDerivedStateFromProps(
    nextProps: ICalendarProps,
    prevState: ICalendarState
  ) {
    let state = {}
    if (!prevState.currentViewDate) {
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
        selectedDates: prevState.selectedDates
          ? [...prevState.selectedDates]
          : [],
        currentViewDate: nextProps.startViewDate,
      }
    }
    // before first render
    if (!prevState.currentView) {
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
        (nextProps.minView &&
          nextProps.startView &&
          !checkViewOrder(nextProps.minView, nextProps.startView)) ||
        (nextProps.maxView &&
          nextProps.startView &&
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
          selectedDates: prevState.selectedDates
            ? [...prevState.selectedDates]
            : [],
          currentView: nextProps.minView,
        }
      } else {
        state = {
          ...prevState,
          ...state,
          selectedDates: prevState.selectedDates
            ? [...prevState.selectedDates]
            : [],
          currentView: nextProps.startView,
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
        newDate = getNewDate(currentViewDate!, MONTH, 1)
        checkViewOrder(YEAR, maxView!) &&
          this.setState({
            currentView: YEAR,
            currentViewDate: newDate,
          })
        break
      case YEAR:
        newDate = getNewDate(currentViewDate!, DECADE, 1)
        checkViewOrder(DECADE, maxView!) &&
          this.setState({
            currentView: DECADE,
            currentViewDate: newDate,
          })
        break
      case DECADE:
        newDate = getNewDate(currentViewDate!, CENTURY, 1)
        checkViewOrder(CENTURY, maxView!) &&
          this.setState({
            currentView: CENTURY,
            currentViewDate: newDate,
          })
        break

      default:
        break
    }
  }
  handleDrillDown = (date: Date, view: DATE_TYPES) => {
    this.setState({ currentView: view, currentViewDate: date })
  }

  handlePrev = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getPrevDate(currentViewDate!, currentView!)
    this.setState({ currentViewDate: newDate })
  }

  handleNext = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getNextDate(currentViewDate!, currentView!)
    this.setState({ currentViewDate: newDate })
  }

  handleDoublePrev = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getDoublePrevDate(currentViewDate!, currentView!)
    this.setState({ currentViewDate: newDate })
  }

  handleDoubleNext = () => {
    const { currentView, currentViewDate } = this.state
    const newDate = getDoubleNextDate(currentViewDate!, currentView!)
    this.setState({ currentViewDate: newDate })
  }

  handleMultiSelect = (date: Date, selected: boolean) => {
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
          ...selectedDates.slice(index + 1),
        ]
        this.setState({
          selectedDates: newSelectedDates,
        })
      }
      onMultiSelect && onMultiSelect([...newSelectedDates])
    }
  }

  handleRangeSelect = (dates: Date[], selected: boolean) => {
    const {
      onMultiSelect,
      range,
      onRangeMultiSelect,
      freezeSelection,
    } = this.props
    let newSelectedDates: Date[] = []
    if (!freezeSelection) {
      if (selected) {
        newSelectedDates = [...dates]
        this.setState({
          selectedDates: [
            newSelectedDates[0],
            newSelectedDates[newSelectedDates.length - 1],
          ],
        })
        range &&
          onRangeMultiSelect &&
          onRangeMultiSelect([
            newSelectedDates[0],
            newSelectedDates[newSelectedDates.length - 1],
          ])
      } else {
        newSelectedDates = []
        range && onRangeMultiSelect && onRangeMultiSelect(newSelectedDates)
        this.setState({
          selectedDates: newSelectedDates,
        })
      }
      range && onMultiSelect && onMultiSelect([...newSelectedDates])
    }
  }
  handleSingleSelect = (date: Date, selected: boolean) => {
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
      selectedDates,
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
      disabledWeekdays,
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
      minuteStep,
      disableableNavigation,
    } = this.props

    return (
      <CalendarView
        classNames={classNames}
        currentView={currentView!}
        currentViewDate={currentViewDate!}
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
        calendarType={calendarType!}
        minView={minView!}
        maxView={maxView!}
        weekends={weekends}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        availableDates={availableDates}
        multiSelect={multiSelect}
        disableableNavigation={disableableNavigation}
        disabledWeekdays={disabledWeekdays}
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
        navLabelShortFormat={navLabelShortFormat}
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

type ICalendarState = {
  currentView?: DATE_TYPES
  currentViewDate?: Date
  selectedDates: Date[]
  selectedDate?: Date
}

type ICalendarProps = {
  classNames?: string
  withTime?: boolean
  selectedDate?: Date
  selectedDates?: Date[]
  locale?: string
  weekends?: boolean
  calendarType?: CALENDAR_TYPE
  onDateSelected?: (date: Date, selected: boolean) => void
  onMultiSelect?: (dates: Date[]) => void
  onRangeMultiSelect?: (dates: Date[]) => void
  multiSelect?: boolean
  range?: boolean
  startViewDate?: Date
  minDate?: Date
  maxDate?: Date
  minView?: DATE_TYPES
  maxView?: DATE_TYPES
  startView?: DATE_TYPES
  disabledDates?: Date[]
  availableDates?: Date[]
  disabledWeekdays?: DAYS[]
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
  doubleNextLabel?: string
  nextLabel?: string
  prevLabel?: string
  doublePrevLabel?: string
  nextClasses?: string
  doubleNextClasses?: string
  navLabelShortFormat?: boolean
  disableableNavigation?: boolean
  disableableYearTiles?: boolean
  disableableDecadeTiles?: boolean
  disableableCenturyTiles?: boolean
  navigableBeforeAndAfterDates?: boolean
  hideBeforeAndAfterDates?: boolean
  onMouseEnterTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onMouseLeaveTile?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  tileClasses?: string
  headerClasses?: string
  freezeSelection?: boolean
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
}

export default Calendar
