import './Tile.css'

import PropTypes from 'prop-types'
import React from 'react'

const Tile = ({
  value,
  disabled,
  selected,
  grayed,
  weekend,
  monthType,
  onDrillDown,
  idx,
  onDateSelected
}) => {
  const classes = `tile${disabled ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ' '}${
    monthType ? ' tile-month' : ' tile-date'
  }`

  return (
    <>
      {onDrillDown ? (
        <div className={classes} onClick={e => onDrillDown(idx)}>
          {value}
        </div>
      ) : (
        <div
          className={classes}
          onClick={e => onDateSelected(value, !selected)}
        >
          {value.getDate()}
        </div>
      )}
    </>
  )
}

Tile.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
    .isRequired,
  idx: PropTypes.PropTypes.number.isRequired,
  onDrillDown: PropTypes.func,
  onDateSelected: PropTypes.func,
  monthType: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  weekend: PropTypes.bool,
  grayed: PropTypes.bool
}

export default Tile
