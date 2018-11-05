import React, { SFC } from 'react'

import { CALENDAR_TYPE, DAYS, ISO_8601 } from '../utils/constants'
import {
  equalDates,
  getMonthViewDates,
  isDateDisabled,
  isDateGrayed,
  isDateSelected,
  isWeekend
} from '../utils/helpers'
import Tile from './Tile'

const MonthView: SFC<IMonthViewProps> = ({
  range,
  calendarType,
  currentViewDate,
  weekends,
  onDateSelected,
  minDate,
  maxDate,
  disabledDates,
  availableDates,
  selectedDates,
  selectedDate,
  selectHandler,
  hideBeforeAndAfterDates,
  onMouseEnterTile,
  onMouseLeaveTile,
  onHover,
  hoverDates,
  tileClasses,
  disableWeekdays
}: IMonthViewProps) => {
  const data = getMonthViewDates(
    currentViewDate,
    calendarType,
    !!hideBeforeAndAfterDates
  ).map((item, idx) => {
    let hover = false,
      blank = false,
      showWeekend = false,
      grayed = false,
      disabled = false,
      selected = false
    if (item === null) {
      blank = true
    } else {
      grayed = isDateGrayed(item, currentViewDate)
      selected = isDateSelected(item, selectedDate, selectedDates, range)
      disabled = isDateDisabled(
        item,
        availableDates,
        minDate,
        maxDate,
        disabledDates,
        disableWeekdays
      )
      showWeekend = isWeekend(idx, weekends, calendarType)
      if (range && hoverDates && onHover && selectedDate) {
        hover = hoverDates.some(hoverItem => equalDates(hoverItem, item))
      }
    }
    return (
      <Tile
        key={idx}
        idx={idx}
        dateType
        blank={blank}
        weekend={showWeekend}
        grayed={grayed}
        onMouseEnter={onMouseEnterTile}
        onMouseLeave={onMouseLeaveTile}
        disabled={disabled}
        range={range}
        selected={selected && !disabled}
        hover={hover}
        onRangeHover={onHover}
        onDateSelected={onDateSelected}
        onDateSelect={selectHandler}
        value={(item && item.getDate()) || ''}
        date={item}
        tileClasses={tileClasses}
      />
    )
  })
  return <> {data}</>
}

export type IMonthViewProps = {
  range?: boolean
  disableWeekdays?: DAYS[]
  weekends?: boolean
  calendarType: CALENDAR_TYPE
  minDate?: Date
  maxDate?: Date
  currentViewDate: Date
  disabledDates?: Date[]
  availableDates?: Date[]
  selectedDates?: Date[]
  selectedDate?: Date
  hideBeforeAndAfterDates?: boolean
  hoverDates?: Date[]
  tileClasses?: string
  onHover: (date: Date | null, selected: boolean) => void
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

MonthView.defaultProps = {
  calendarType: ISO_8601
}

export default MonthView
