import React, { SFC } from 'react'

import { YEAR } from '../utils/constants'
import { getNewDate, isYearDisabled, isYearSelected } from '../utils/helpers'
import Tile from './Tile'

const DecadeView: SFC<IDecadeViewProps> = ({
  disableableDecadeTiles,
  availableDates,
  minDate,
  maxDate,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  range,
  selectedDate,
  selectedDates,
  hover,
  onHover,
  onDateSelected,
  tileClasses,
  selectHandler,
}: IDecadeViewProps) => {
  const data = Array(10)
    .fill(null)
    .map((item, idx) => getNewDate(currentViewDate, YEAR, idx))
    .map((item, idx) => {
      let disabled = false,
        selected = false
      if (disableableDecadeTiles) {
        disabled = isYearDisabled(item, availableDates, minDate, maxDate)
      }
      selected = isYearSelected(item, selectedDate, selectedDates, range)
      return (
        <Tile
          key={idx}
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          value={item.getFullYear()}
          date={item}
          disabled={disabled}
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

export type IDecadeViewProps = {
  range?: boolean
  currentViewDate: Date
  selectedDate?: Date
  selectedDates?: Date[]
  hover: boolean
  disableableDecadeTiles?: boolean
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

DecadeView.defaultProps = {
  locale: 'en',
}
export default DecadeView
