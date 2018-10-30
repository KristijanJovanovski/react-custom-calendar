import React from 'react'
import PropTypes from 'prop-types'
import './TimeTile.css'
import { MINUTE, HOUR, US, ISO_8601 } from '../utils/constants'

const TimeTile = ({
  val,
  type,
  onClick,
  selected,
  timeTileClasses,
  hourFormat
}) => {
  const classes = `time-tile${selected ? ' selected' : ''}${
    timeTileClasses ? ' ' + timeTileClasses : ''
  }`
  return (
    <div onClick={() => onClick(val, type, hourFormat)} className={classes}>
      {val}
    </div>
  )
}

TimeTile.propTypes = {
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf([MINUTE, HOUR]),
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  timeTileClasses: PropTypes.string,
  hourFormat: PropTypes.oneOf([US, ISO_8601])
}

export default TimeTile
