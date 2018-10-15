import React from 'react'
import PropTypes from 'prop-types'
import './Tile.css'
const Tile = ({ val, disabled, selected, grayed, datesType }) => {
  return (
    <div
      className={`tile${disabled ? ' disabled' : ''}${
        selected ? ' selected' : ''
      }${grayed ? ' grayed' : ''}${datesType ? ' tile-date' : ' tile-month'}`}
    >
      {val}
    </div>
  )
}

Tile.propTypes = {
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  datesType: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  grayed: PropTypes.bool
}

export default Tile
