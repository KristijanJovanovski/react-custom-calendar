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
  onDrillDown,
  idx,
  onDateSelected,
  onDateSelect,
  blank,
  onMouseEnter,
  onMouseLeave,
  onRangeHover,
  hover
}) => {
  const classes = `tile${disabled || blank ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ''}${
    dateType ? ' tile-date' : ' tile-month'
  }${blank ? ' blank' : ''}${hover ? ' hover-range' : ''}`

  const handleSelectDate = () => {
    if (dateType) {
      if (!disabled && !blank) {
        onDateSelect(date, !selected)
        onDateSelected(date, !selected)
      }
    } else {
      if (!disabled && !blank) {
        onDrillDown(idx)
      }
    }
  }
  const handleMouseEnter = e => {
    onMouseEnter && onMouseEnter(e, date)
    range && onRangeHover(date, true)
  }
  const handleMouseLeave = e => {
    onMouseLeave && onMouseLeave(e, date)
    range && onRangeHover(date, false)
  }

  return (
    <>
      <div
        index={idx}
        className={classes}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSelectDate}
      >
        {value}
      </div>
    </>
  )
}

Tile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onRangeHover: PropTypes.func
}

export default Tile
