import React, { SFC } from 'react'

import { DECADE } from '../utils/constants'
import {
  getDecadeRangeText,
  getNewDate,
  isDecadeDisabled,
  isDecadeSelected
} from '../utils/helpers'
import Tile from './Tile'

const CenturyView: SFC<ICenturyViewProps> = ({
  disableableCenturyTiles,
  availableDates,
  minDate,
  maxDate,
  currentViewDate,
  onMouseEnterTile,
  onMouseLeaveTile,
  range,
  hover,
  onHover,
  onDateSelected,
  selectHandler,
  selectedDate,
  selectedDates,
  tileClasses
}: ICenturyViewProps) => {
  const data = Array(10)
    .fill(null)
    .map((item, idx) => getNewDate(currentViewDate, DECADE, idx))
    .map((item, idx) => {
      let disabled = false,
        selected = false
      if (disableableCenturyTiles) {
        disabled = isDecadeDisabled(item, availableDates, minDate, maxDate)
      }
      selected = isDecadeSelected(item, selectedDate, selectedDates, range)
      return (
        <Tile
          key={idx}
          disabled={disabled}
          onMouseEnter={onMouseEnterTile}
          onMouseLeave={onMouseLeaveTile}
          value={getDecadeRangeText(item)}
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

export type ICenturyViewProps = {
  currentViewDate: Date
  hover: boolean
  range?: boolean
  selectedDate?: Date
  selectedDates?: Date[]
  disableableCenturyTiles?: boolean
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

export default CenturyView
