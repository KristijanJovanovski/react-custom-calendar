import './App.css'

import React, { Component } from 'react'

import Calendar from './Calendar/Calendar'

class App extends Component {
  handleDateSelected = (date, selected) => {
    console.log('selected:', selected, date)
  }

  render() {
    return (
      <div className="App">
        <div className="calendar-container">
          <h1>Calendar 1</h1>
          <Calendar
            locale={'mk'}
            onDateSelected={this.handleDateSelected}
            weekends
            minDate={new Date(2018, 9, 3)}
            maxDate={new Date(2018, 10, 1)}
            disabledDates={[new Date(2018, 9, 5)]}
            availableDates={[new Date(2018, 10, 4)]}
          />
        </div>
        <div className="calendar-container">
          <h1>Calendar 2</h1>
          <Calendar
            locale={'en'}
            calendarType={'ISO 8601'}
            weekends
            availableDates={[new Date(2018, 10, 5)]}
            onDateSelected={this.handleDateSelected}
          />
        </div>
        <div className="calendar-container">
          <h1>Calendar 3</h1>
          <Calendar
            locale={'fr'}
            calendarType={'US'}
            multiSelect
            range
            onDateSelected={this.handleDateSelected}
          />
        </div>
        <div className="calendar-container">
          <h1>Calendar 4</h1>
          <Calendar
            locale={'ddd'}
            calendarType={'US'}
            onDateSelected={this.handleDateSelected}
          />
        </div>
      </div>
    )
  }
}

export default App
