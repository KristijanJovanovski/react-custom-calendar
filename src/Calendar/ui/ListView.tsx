import './ListView.css'

import React, { SFC } from 'react'

import { CALENDAR_TYPE, TIME_TYPE } from '../utils/constants'
import TimeTile from './TimeTile'

const ListView: SFC<IListViewProps> = ({
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
    if (type === TIME_TYPE.HOUR) {
      if (hourFormat === CALENDAR_TYPE.US) {
        const h = +item.split(' ')[0]
        const am_pm = item.split(' ')[1]
        selected =
          selectedDate.getHours() ===
          (am_pm === 'PM' ? h + 12 : h === 12 ? 0 : h)
      } else {
        selected = selectedDate.getHours() === +item
      }
    } else if (type === TIME_TYPE.MINUTE) {
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

type IListViewProps = {
  selectedDate: Date
  label: string
  items: (string)[]
  onClick: (time: string, type: TIME_TYPE, format?: CALENDAR_TYPE) => void
  type: TIME_TYPE
  timeTileClasses?: string
  timeHeaderClasses?: string
  timeListClasses?: string
  hourFormat?: CALENDAR_TYPE
}

export default ListView
