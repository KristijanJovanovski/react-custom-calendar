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
  onDateSelect
}) => {
  const classes = `tile${disabled ? ' disabled' : ''}${
    selected ? ' selected' : ''
  }${grayed ? ' grayed' : ''}${weekend ? ' weekend' : ' '}${
    dateType ? ' tile-date' : ' tile-month'
  }`

  const handleClick = () => {
    if (!disabled) {
      onDateSelect(value, !selected)
      onDateSelected(value, !selected)
    }
  }

  return (
    <>
      {!dateType ? (
        <div className={classes} onClick={e => onDrillDown(idx)}>
          {value}
        </div>
      ) : (
        <div className={classes} onClick={e => handleClick(e)}>
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
  onDateSelect: PropTypes.func,
  onDrillDown: PropTypes.func,
  onDateSelected: PropTypes.func,
  dateType: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  weekend: PropTypes.bool,
  grayed: PropTypes.bool
}

export default Tile
