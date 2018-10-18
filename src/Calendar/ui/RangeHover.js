import React from 'react'

import { getDateRange } from '../utils/helpers'

export default class RangeHover extends React.Component {
  state = {
    hoverDates: []
  }
  handleHover = (hoverDate, hover) => {
    const selectedDate = this.props.selectedDate
    if (selectedDate && hover) {
      const hoverDates = getDateRange(selectedDate, hoverDate)
      this.setState({ hoverDates })
    } else {
      this.setState({ hoverDates: [] })
    }
  }
  render() {
    return (
      <>{this.props.children([...this.state.hoverDates], this.handleHover)}</>
    )
  }
}
