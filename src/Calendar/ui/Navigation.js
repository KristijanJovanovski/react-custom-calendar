import './Navigation.css'

import PropTypes from 'prop-types'
import React from 'react'

import { getMonthAndYear, getYear } from '../utils/helpers'

const Navigation = ({
  locale = 'en',
  currentView,
  currentStartDate,
  drillUp,
  onPrev,
  onNext,
  onDoublePrev,
  onDoubleNext
}) => {
  const label =
    currentView === 'Month'
      ? getMonthAndYear(currentStartDate, locale)
      : getYear(currentStartDate)
  return (
    <div className="navigation">
      <div className={`nav-item`} onClick={onDoublePrev}>
        {'<<'}
      </div>
      <div className={`nav-item`} onClick={onPrev}>
        {'<'}
      </div>
      <div className={`nav-item`} onClick={drillUp}>
        {label}
      </div>
      <div className={`nav-item`} onClick={onNext}>
        {'>'}
      </div>
      <div className={`nav-item`} onClick={onDoubleNext}>
        {'>>'}
      </div>
    </div>
  )
}
Navigation.propTypes = {
  drillUp: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDoublePrev: PropTypes.func.isRequired,
  onDoubleNext: PropTypes.func.isRequired,
  locale: PropTypes.string,
  currentView: PropTypes.string,
  currentStartDate: PropTypes.instanceOf(Date)
}
export default Navigation
