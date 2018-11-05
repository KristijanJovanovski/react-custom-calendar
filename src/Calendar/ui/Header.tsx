import './Header.css'

import React, { SFC } from 'react'

import { CALENDAR_TYPE, ISO_8601, SHORT } from '../utils/constants'
import { transformWeekDays } from '../utils/helpers'

const Header: SFC<IHeaderProps> = ({
  locale,
  calendarType,
  headerClasses,
}: IHeaderProps) => {
  const days = transformWeekDays(SHORT, locale, calendarType)
  const classes = `header ${headerClasses ? headerClasses : ''}`
  return (
    <div className={classes}>
      {days.map((item, idx) => (
        <div className={'header-item'} key={idx}>
          {item}
        </div>
      ))}
    </div>
  )
}
export type IHeaderProps = {
  calendarType: CALENDAR_TYPE
  locale?: string
  headerClasses?: string
}

Header.defaultProps = {
  locale: 'en',
  calendarType: ISO_8601,
}

export default Header
