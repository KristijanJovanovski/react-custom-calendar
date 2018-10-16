import './App.css'

import React, { Component } from 'react'

import Calendar from './Calendar/Calendar'

class App extends Component {
  handleDateSelected = date => {
    console.log(date)
  }

  render() {
    return (
      <div className="App">
        <div className="calendar-container">
          <h1>Calendar 1</h1>
          <Calendar locale={'mk'} onDateSelected={this.handleDateSelected} />
        </div>
        <div className="calendar-container">
          <h1>Calendar 2</h1>
          <Calendar
            locale={'en'}
            calendarType={'ISO 8601'}
            onDateSelected={this.handleDateSelected}
          />
        </div>
        <div className="calendar-container">
          <h1>Calendar 3</h1>
          <Calendar
            locale={'mk'}
            calendarType={'US'}
            onDateSelected={this.handleDateSelected}
          />
        </div>
        <div className="calendar-container">
          <h1>Calendar 4</h1>
          <Calendar
            locale={'en'}
            calendarType={'US'}
            onDateSelected={this.handleDateSelected}
          />
        </div>
      </div>
    )
  }
}

export default App
