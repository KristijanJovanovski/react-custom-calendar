import './TimeView.css'

import React, { SFC } from 'react'

import { CALENDAR_TYPE, TIME_TYPE } from '../utils/constants'
import { getHours, getMinutes } from '../utils/helpers'
import ListView from './ListView'

type ITimeViewProps = {
  selectedDate: Date
  onTimeSelected: (date: Date) => void
  hourLabel?: string
  hourTileClasses?: string
  hourHeaderClasses?: string
  hourListClasses?: string
  hourFormat?: CALENDAR_TYPE
  minuteLabel?: string
  minuteTileClasses?: string
  minuteHeaderClasses?: string
  minuteListClasses?: string
  minuteStep?: number
}
const TimeView: SFC<ITimeViewProps> = ({
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
}: ITimeViewProps) => {
  const minutes = getMinutes(minuteStep || 1)
  const hours = getHours(hourFormat || CALENDAR_TYPE.ISO_8601)

  const handleTime = (
    time: string,
    type: TIME_TYPE,
    format: CALENDAR_TYPE = CALENDAR_TYPE.ISO_8601
  ) => {
    let date = selectedDate
    if (type === TIME_TYPE.HOUR) {
      let hours: string | number = time
      if (format && format === CALENDAR_TYPE.US) {
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
        +hours,
        selectedDate.getMinutes()
      )
    } else if (type === TIME_TYPE.MINUTE) {
      date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedDate.getHours(),
        +time
      )
    }
    onTimeSelected(date)
  }
  const classes = `time-container`

  return (
    <div className={classes}>
      <ListView
        items={hours}
        type={TIME_TYPE.HOUR}
        label={hourLabel || 'Hours:'}
        onClick={handleTime}
        selectedDate={selectedDate}
        timeTileClasses={hourTileClasses}
        timeHeaderClasses={hourHeaderClasses}
        timeListClasses={hourListClasses}
        hourFormat={hourFormat || CALENDAR_TYPE.ISO_8601}
      />
      <ListView
        items={minutes}
        type={TIME_TYPE.MINUTE}
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

export default TimeView
