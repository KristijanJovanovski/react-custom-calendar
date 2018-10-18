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
  onDrillDown,
  idx,
  onDateSelected,
  onDateSelect,
  blank
}) => {
  const classes = `tile${disabled || blank ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ' '}${
    dateType ? ' tile-date' : ' tile-month'
  }${blank ? ' blank' : ''}`

  const handleSelectDate = () => {
    if (!disabled && !blank) {
      onDateSelect(value, !selected)
      onDateSelected(value, !selected)
    }
  }
  const handleDrillDown = () => {
    if (!disabled && !blank) {
      onDrillDown(idx)
    }
  }

  return (
    <>
      {!dateType ? (
        <div className={classes} onClick={e => handleDrillDown()}>
          {value}
        </div>
      ) : (
        <div className={classes} onClick={e => handleSelectDate(e)}>
          {blank ? '' : value.getDate()}
        </div>
      )}
    </>
  )
}

Tile.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  idx: PropTypes.PropTypes.number.isRequired,
  onDateSelect: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDateSelected: PropTypes.func,
  dateType: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  weekend: PropTypes.bool,
  grayed: PropTypes.bool,
  blank: PropTypes.bool
}

export default Tile
