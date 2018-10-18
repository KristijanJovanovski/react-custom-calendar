import './Navigation.css'

import PropTypes from 'prop-types'
import React from 'react'

import { CENTURY, DECADE, MONTH, YEAR } from '../utils/constants'
import {
  getCenturyRange,
  getDecadeRange,
  getMonthAndYear,
  getYear
} from '../utils/helpers'

const Navigation = ({
  locale = 'en',
  currentView,
  currentViewDate,
  drillUp,
  onPrev,
  onNext,
  onDoublePrev,
  onDoubleNext,
  navigationDisabled,
  prevDisabled,
  nextDisabled,
  doublePrevDisabled,
  doubleNextDisabled,
  navigationHidden,
  navigationClasses,
  doublePrevClasses,
  prevClasses,
  labelClasses,
  nextClasses,
  doubleNextClasses,
  doublePrevLabel,
  prevLabel,
  nextLabel,
  doubleNextLabel,
  labelShortFormat
}) => {
  let labelText
  if (currentView === MONTH) {
    labelText = getMonthAndYear(currentViewDate, locale, labelShortFormat)
  } else if (currentView === YEAR) {
    labelText = getYear(currentViewDate)
  } else if (currentView === DECADE) {
    labelText = getDecadeRange(currentViewDate)
  } else if (currentView === CENTURY) {
    labelText = getCenturyRange(currentViewDate)
  }
  const doublePrev =
    navigationDisabled || doublePrevDisabled ? (
      <div
        className={`nav-item disabled${
          doublePrevClasses ? ' ' + doublePrevClasses : ''
        }`}
      >
        {doublePrevLabel ? doublePrevLabel : '<<'}
      </div>
    ) : (
      <div
        className={`nav-item${
          doublePrevClasses ? ' ' + doublePrevClasses : ''
        }`}
        onClick={onDoublePrev}
      >
        {doublePrevLabel ? doublePrevLabel : '<<'}
      </div>
    )
  const prev =
    navigationDisabled || prevDisabled ? (
      <div
        className={`nav-item disabled${prevClasses ? ' ' + prevClasses : ''}`}
      >
        {prevLabel ? prevLabel : '<'}
      </div>
    ) : (
      <div
        className={`nav-item${prevClasses ? ' ' + prevClasses : ''}`}
        onClick={onPrev}
      >
        {prevLabel ? prevLabel : '<'}
      </div>
    )
  const next =
    navigationDisabled || nextDisabled ? (
      <div
        className={`nav-item disabled${nextClasses ? ' ' + nextClasses : ''}`}
      >
        {nextLabel ? nextLabel : '>'}
      </div>
    ) : (
      <div
        className={`nav-item${nextClasses ? ' ' + nextClasses : ''}`}
        onClick={onNext}
      >
        {nextLabel ? nextLabel : '>'}
      </div>
    )
  const doubleNext =
    navigationDisabled || doubleNextDisabled ? (
      <div
        className={`nav-item disabled${
          doubleNextClasses ? ' ' + doubleNextClasses : ''
        }`}
      >
        {doubleNextLabel ? doubleNextLabel : '>>'}
      </div>
    ) : (
      <div
        className={`nav-item${
          doubleNextClasses ? ' ' + doubleNextClasses : ''
        }`}
        onClick={onDoubleNext}
      >
        {doubleNextLabel ? doubleNextLabel : '>>'}
      </div>
    )
  const label = navigationDisabled ? (
    <div
      className={`nav-item disabled${labelClasses ? ' ' + labelClasses : ''}`}
    >
      {labelText}
    </div>
  ) : (
    <div
      className={`nav-item${labelClasses ? ' ' + labelClasses : ''}`}
      onClick={drillUp}
    >
      {labelText}
    </div>
  )

  return (
    <div
      className={`navigation${currentView === CENTURY ? ' century' : ''}${
        navigationHidden ? ' hidden' : ''
      }${navigationClasses ? ' ' + navigationClasses : ''}`}
    >
      {!navigationHidden && currentView !== CENTURY && doublePrev}
      {!navigationHidden && prev}
      {label}
      {!navigationHidden && next}
      {!navigationHidden && currentView !== CENTURY && doubleNext}
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
  currentViewDate: PropTypes.instanceOf(Date),
  navigationDisabled: PropTypes.bool,
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  doublePrevDisabled: PropTypes.bool,
  doubleNextDisabled: PropTypes.bool,
  navigationHidden: PropTypes.bool,
  navigationClasses: PropTypes.string,
  doublePrevClasses: PropTypes.string,
  prevClasses: PropTypes.string,
  labelClasses: PropTypes.string,
  nextClasses: PropTypes.string,
  doubleNextClasses: PropTypes.string
}
export default Navigation
