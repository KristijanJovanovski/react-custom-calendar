import './TimeView.css'

import React from 'react'
import PropTypes from 'prop-types'

import ListView from './ListView'
import { getMinutes, getHours } from '../utils/helpers'
import { MINUTE, HOUR, US, ISO_8601 } from '../utils/constants'

const TimeView = ({
  selectedDate,
  onTimeSelected,
  hourLabel,
  hourTileClasses,
  hourHeaderClasses,
  hourListClasses,
  hourFormat,
  minuteLabel,
  minuteTileClasses,
  minuteHeaderClasses,
  minuteListClasses,
  minuteStep
}) => {
  const minutes = getMinutes(minuteStep || 1)
  const hours = getHours(hourFormat || ISO_8601)

  const handleTime = (time, type, format) => {
    let date = selectedDate
    if (type === HOUR) {
      let hours = time
      if (format && format === US) {
        const am_pm = hours.split(' ')[1]
        hours =
          am_pm && am_pm === 'PM'
            ? +hours.split(' ')[0] + 12
            : +hours.split(' ')[0] === 12
              ? 0
              : +hours.split(' ')[0]
      }
      date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hours,
        selectedDate.getMinutes()
      )
    } else if (type === MINUTE) {
      date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedDate.getHours(),
        time
      )
    }
    onTimeSelected(date)
  }
  const classes = `time-container`

  return (
    <div className={classes}>
      <ListView
        items={hours}
        type={HOUR}
        label={hourLabel || 'Hours:'}
        onClick={handleTime}
        selectedDate={selectedDate}
        timeTileClasses={hourTileClasses}
        timeHeaderClasses={hourHeaderClasses}
        timeListClasses={hourListClasses}
        hourFormat={US}
      />
      <ListView
        items={minutes}
        type={MINUTE}
        label={minuteLabel || 'Minutes:'}
        onClick={handleTime}
        selectedDate={selectedDate}
        timeTileClasses={minuteTileClasses}
        timeHeaderClasses={minuteHeaderClasses}
        timeListClasses={minuteListClasses}
      />
    </div>
  )
}

TimeView.propTypes = {
  hourLabel: PropTypes.string,
  hourTileClasses: PropTypes.string,
  hourHeaderClasses: PropTypes.string,
  hourListClasses: PropTypes.string,
  hourFormat: PropTypes.oneOf([US, ISO_8601]),
  minuteLabel: PropTypes.string,
  minuteTileClasses: PropTypes.string,
  minuteHeaderClasses: PropTypes.string,
  minuteListClasses: PropTypes.string,
  minuteStep: PropTypes.number
}

export default TimeView
