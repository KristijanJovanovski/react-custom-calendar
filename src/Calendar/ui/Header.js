import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'

import { transformWeekDays } from '../utils/helpers'
import { SHORT } from '../utils/constants'

const Header = ({ locale = 'en', calendarType = 'ISO 8601' }) => {
  const days = transformWeekDays(SHORT, locale, calendarType)
  return (
    <div className="header">
      {days.map((item, idx) => (
        <div className="header-item" key={idx}>
          {item}
        </div>
      ))}
    </div>
  )
}
Header.propTypes = {
  locale: PropTypes.string,
  calendarType: PropTypes.oneOf(['US', 'ISO 8601'])
}
export default Header
