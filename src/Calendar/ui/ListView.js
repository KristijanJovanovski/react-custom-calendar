import React from 'react'
import PropTypes from 'prop-types'
import TimeTile from './TimeTile'
import './ListView.css'
import { HOUR, MINUTE, US, ISO_8601 } from '../utils/constants'

const ListView = ({
  items,
  onClick,
  type,
  label,
  selectedDate,
  timeTileClasses,
  timeHeaderClasses,
  timeListClasses,
  hourFormat
}) => {
  const classes = `time-wrapper`
  const headerClasses = `time-header${
    timeHeaderClasses ? ' ' + timeHeaderClasses : ''
  }`
  const listClasses = `time-list${timeListClasses ? ' ' + timeListClasses : ''}`
  const tiles = items.map((item, idx) => {
    let selected = false
    if (type === HOUR) {
      if (hourFormat === US) {
        const h = +item.split(' ')[0]
        const am_pm = item.split(' ')[1]
        selected =
          selectedDate.getHours() ===
          (am_pm === 'PM' ? h + 12 : h === 12 ? 0 : h)
      } else {
        selected = selectedDate.getHours() === +item
      }
    } else if (type === MINUTE) {
      selected = selectedDate.getMinutes() === +item
    }

    return (
      <TimeTile
        key={idx}
        val={item}
        selected={selected}
        type={type}
        onClick={onClick}
        timeTileClasses={timeTileClasses}
        hourFormat={hourFormat}
      />
    )
  })
  return (
    <div className={classes}>
      <div className={headerClasses}>{label}</div>
      <div className={listClasses}>{tiles}</div>
    </div>
  )
}

ListView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onClick: PropTypes.func,
  type: PropTypes.oneOf([MINUTE, HOUR]),
  timeTileClasses: PropTypes.string,
  timeHeaderClasses: PropTypes.string,
  timeListClasses: PropTypes.string,
  hourFormat: PropTypes.oneOf([US, ISO_8601])
}

export default ListView
