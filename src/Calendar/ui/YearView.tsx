import React, { SFC } from 'react'

import { LONG } from '../utils/constants'
import {
  getMonthFormated,
  getMonthsArray,
  isMonthDisabled,
  isMonthSelected
} from '../utils/helpers'
import Tile from './Tile'

const YearView: SFC<IYearViewProps> = ({
  disableableYearTiles,
  availableDates,
  minDate,
  maxDate,
  locale,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  selectedDate,
  selectedDates,
  range,
  hover,
  onHover,
  onDateSelected,
  selectHandler,
  tileClasses
}: IYearViewProps) => {
  const data = getMonthsArray(currentViewDate).map((item, idx) => {
    let disabled = false,
      selected = false
    const month = getMonthFormated(item, locale, LONG)
    if (disableableYearTiles) {
      disabled = isMonthDisabled(item, availableDates, minDate, maxDate)
    }
    selected = isMonthSelected(item, selectedDate, selectedDates, range)

    return (
      <Tile
        key={idx}
        disabled={disabled}
        onMouseEnter={onMouseEnterTile}
        onMouseLeave={onMouseLeaveTile}
        value={month}
        date={item}
        idx={idx}
        range={range}
        selected={selected && !disabled}
        hover={hover}
        onRangeHover={onHover}
        onDateSelected={onDateSelected}
        onDateSelect={selectHandler}
        tileClasses={tileClasses}
      />
    )
  })
  return <>{data}</>
}
export type IYearViewProps = {
  currentViewDate: Date
  selectedDate?: Date
  selectedDates?: Date[]
  hover: boolean
  range?: boolean
  disableableYearTiles?: boolean
  availableDates?: Date[]
  minDate?: Date
  maxDate?: Date
  locale?: string
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
YearView.defaultProps = {
  locale: 'en'
}
export default YearView
