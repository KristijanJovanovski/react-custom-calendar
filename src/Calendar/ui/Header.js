import './Header.css'

import PropTypes from 'prop-types'
import React from 'react'

import { SHORT } from '../utils/constants'
import { transformWeekDays } from '../utils/helpers'

const Header = ({
  locale = 'en',
  calendarType = 'ISO 8601',
  headerClasses
}) => {
  const days = transformWeekDays(SHORT, locale, calendarType)
  const classes = `header ${headerClasses ? headerClasses : ''}`
  return (
    <div className={classes}>
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
  headerClasses: PropTypes.string,
  calendarType: PropTypes.oneOf(['US', 'ISO 8601'])
}
export default Header
