import './TimeTile.css'

import React, { SFC } from 'react'

import { CALENDAR_TYPE, TIME_TYPE } from '../utils/constants'

const TimeTile: SFC<ITimeTileProps> = ({
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

type ITimeTileProps = {
  val: string
  type: TIME_TYPE
  onClick: (time: string, type: TIME_TYPE, format?: CALENDAR_TYPE) => void
  selected: boolean
  timeTileClasses?: string
  hourFormat?: CALENDAR_TYPE
}

export default TimeTile
