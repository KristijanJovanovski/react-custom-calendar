import './Tile.css'

import React, { SFC } from 'react'

const Tile: SFC<ITileProps> = ({
  value,
  disabled,
  range,
  selected,
  grayed,
  weekend,
  dateType,
  date,
  idx,
  onDateSelected,
  onDateSelect,
  blank,
  onMouseEnter,
  onMouseLeave,
  onRangeHover,
  hover,
  tileClasses
}: ITileProps) => {
  const classes = `tile${disabled || blank ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ''}${
    dateType ? ' tile-date' : ' tile-month'
  }${blank ? ' blank' : ''}${hover ? ' hover-range' : ''}${
    tileClasses ? ' ' + tileClasses : ''
  }`

  const handleSelectDate = () => {
    if (!disabled && !blank && date) {
      onDateSelect && onDateSelect(date, !selected)
      onDateSelected && onDateSelected(date, !selected)
    }
  }
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter && onMouseEnter(e, date)
    range && onRangeHover && onRangeHover(date, true)
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave && onMouseLeave(e, date)
    range && onRangeHover && onRangeHover(date, false)
  }

  return (
    <div
      key={idx}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelectDate}
    >
      {value}
    </div>
  )
}

export type ITileProps = {
  value: string | number
  idx: number
  dateType?: boolean
  disabled: boolean
  selected: boolean
  weekend?: boolean
  grayed?: boolean
  hover: boolean
  blank?: boolean
  date: Date | null
  range?: boolean
  tileClasses?: string
  onMouseEnter?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onMouseLeave?: (
    e: React.MouseEvent<HTMLDivElement>,
    date: Date | null
  ) => void
  onRangeHover: (date: Date | null, selected: boolean) => void
  onDateSelect: (date: Date, selected: boolean) => void
  onDateSelected?: (date: Date, selected: boolean) => void
}

export default Tile
