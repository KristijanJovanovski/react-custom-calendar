import './Navigation.css'

import React, { SFC } from 'react'

import { CENTURY, DECADE, LONG, MONTH, SHORT, YEAR } from '../utils/constants'
import {
  getCenturyRangeText,
  getDecadeRangeText,
  getMonthAndYear,
  getYear,
} from '../utils/helpers'

const Navigation: SFC<INavigationProps> = ({
  locale,
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
  navLabelShortFormat,
}: INavigationProps) => {
  let labelText
  if (currentView === MONTH) {
    labelText = getMonthAndYear(
      currentViewDate,
      locale,
      navLabelShortFormat ? SHORT : LONG
    )
  } else if (currentView === YEAR) {
    labelText = getYear(currentViewDate)
  } else if (currentView === DECADE) {
    labelText = getDecadeRangeText(currentViewDate)
  } else if (currentView === CENTURY) {
    labelText = getCenturyRangeText(currentViewDate)
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

export type INavigationProps = {
  drillUp: () => void
  onPrev: () => void
  onNext: () => void
  onDoublePrev: () => void
  onDoubleNext: () => void
  currentViewDate: Date
  locale?: string
  currentView?: string
  navigationDisabled?: boolean
  prevDisabled?: boolean
  nextDisabled?: boolean
  doublePrevDisabled?: boolean
  doubleNextDisabled?: boolean
  navigationHidden?: boolean
  navigationClasses?: string
  doublePrevClasses?: string
  prevClasses?: string
  labelClasses?: string
  nextClasses?: string
  doubleNextClasses?: string
  navLabelShortFormat?: boolean
  doublePrevLabel?: string
  prevLabel?: string
  nextLabel?: string
  doubleNextLabel?: string
}

Navigation.defaultProps = {
  locale: 'en',
  navLabelShortFormat: false,
}

export default Navigation
