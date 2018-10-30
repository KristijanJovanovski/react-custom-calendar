import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'

export default class CalendarWithInput extends Component {
  state = {
    value: undefined,
    isOpen: false
  }

  handleSelection = (date, selected) => {
    if (selected || !this.state.value) {
      this.setState({ value: date, isOpen: false })
    } else {
      this.setState({ value: undefined, isOpen: true })
    }
    this.props.onDateSelected && this.props.onDateSelected(date, selected)
  }
  handleInputFocus = () => {
    this.setState({ isOpen: true })
  }

  render() {
    const { ...rest } = this.props
    const { isOpen } = this.state
    return (
      <div className={'calendar-with-input-container'}>
        <input
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={() => {}}
          value={this.state.value}
          className={'calendar-input'}
          type={'text'}
          readOnly
          style={{ cursor: 'pointer', minWidth: '250px' }}
          placeholder={'Select a date'}
        />
        {isOpen && <Calendar onDateSelected={this.handleSelection} {...rest} />}
      </div>
    )
  }
}
