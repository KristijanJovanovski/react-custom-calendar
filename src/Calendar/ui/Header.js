import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'

import { transformWeekDays } from '../utils/helpers'

const Header = ({ locale = 'en', calendarType = 'ISO 8601' }) => {
  const days = transformWeekDays(locale, calendarType)
  return (
    <div className="header">
      {days.short.map((item, idx) => (
        <div className="header-item" key={idx}>
          {item}
        </div>
      ))}
    </div>
  )
}
Header.propTypes = {
  locale: PropTypes.string,
  calendarType: PropTypes.string
}
export default Header
