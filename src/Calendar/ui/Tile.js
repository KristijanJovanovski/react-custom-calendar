import './Tile.css'

import PropTypes from 'prop-types'
import React from 'react'

const Tile = ({
  value,
  disabled,
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
  onMouseLeave
}) => {
  const classes = `tile${disabled || blank ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ''}${
    dateType ? ' tile-date' : ' tile-month'
  }${blank ? ' blank' : ''}`

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
  const hover = {}
  onMouseEnter && (hover['onMouseEnter'] = e => onMouseEnter(e, date))
  onMouseLeave && (hover['onMouseLeave'] = e => onMouseLeave(e, date))

  return (
    <>
      <div
        index={idx}
        className={classes}
        {...hover}
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
  blank: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

export default Tile
