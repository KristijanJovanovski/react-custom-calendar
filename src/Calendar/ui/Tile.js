import './Tile.css'

import PropTypes from 'prop-types'
import React from 'react'

const Tile = ({
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
}) => {
  const classes = `tile${disabled || blank ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ''}${
    dateType ? ' tile-date' : ' tile-month'
  }${blank ? ' blank' : ''}${hover ? ' hover-range' : ''}${
    tileClasses ? ' ' + tileClasses : ''
  }`

  const handleSelectDate = () => {
    if (!disabled && !blank) {
      onDateSelect && onDateSelect(date, !selected)
      onDateSelected && onDateSelected(date, !selected)
    }
  }
  const handleMouseEnter = e => {
    onMouseEnter && onMouseEnter(e, date)
    range && onRangeHover && onRangeHover(date, true)
  }
  const handleMouseLeave = e => {
    onMouseLeave && onMouseLeave(e, date)
    range && onRangeHover && onRangeHover(date, false)
  }

  return (
    <div
      index={idx}
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelectDate}
    >
      {value}
    </div>
  )
}

Tile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.instanceOf(Date),
  idx: PropTypes.PropTypes.number.isRequired,
  onDateSelect: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDateSelected: PropTypes.func,
  dateType: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  weekend: PropTypes.bool,
  grayed: PropTypes.bool,
  range: PropTypes.bool,
  hover: PropTypes.bool,
  blank: PropTypes.bool,
  tileClasses: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onRangeHover: PropTypes.func
}

export default Tile
