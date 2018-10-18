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
        <div className="container">
          <h1>Calendar 0</h1>
          <div className="calendar-container">
            <Calendar
              locale={'mk'}
              onDateSelected={this.handleDateSelected}
              weekends
              disableableCenturyTiles
              disableableDecadeTiles
              disableableYearTiles
              navigableBeforeAndAfterDates
              minDate={new Date(2018, 9, 3)}
              maxDate={new Date(2018, 10, 1)}
              disabledDates={[new Date(2018, 9, 5)]}
              availableDates={[new Date(2018, 10, 4)]}
            />
            <code className="calendar-code">
              {`
              <Calendar
                  locale={'mk'}
                  onDateSelected={this.handleDateSelected}
                  weekends
                  disableableCenturyTiles
                  disableableDecadeTiles
                  disableableYearTiles
                  navigableBeforeAndAfterDates
                  minDate={new Date(2018, 9, 3)}
                  maxDate={new Date(2018, 10, 1)}
                  disabledDates={[new Date(2018, 9, 5)]}
                  availableDates={[new Date(2018, 10, 4)]}
              />`}
            </code>
          </div>
        </div>
        <div className="container">
          <h1>Calendar 1</h1>
          <div className="calendar-container">
            <Calendar
              locale={'mk'}
              onDateSelected={this.handleDateSelected}
              weekends
              minDate={new Date(2018, 9, 3)}
              maxDate={new Date(2018, 10, 1)}
            />
            <code className="calendar-code">
              {`
              <Calendar
                  locale={'mk'}
                  onDateSelected={this.handleDateSelected}
                  weekends
                  minDate={new Date(2018, 9, 3)}
                  maxDate={new Date(2018, 10, 1)}
              />`}
            </code>
          </div>
        </div>

        <div className="container">
          <h1>Calendar 2</h1>
          <div className="calendar-container">
            <Calendar
              locale={'en'}
              calendarType={'ISO 8601'}
              weekends
              availableDates={[
                new Date(2018, 10, 5),
                new Date(2018, 10, 6),
                new Date(2018, 10, 7),
                new Date(2018, 10, 8)
              ]}
              onDateSelected={this.handleDateSelected}
            />
            <code className="calendar-code">
              {`
              <Calendar
                  locale={'en'}
                  calendarType={'ISO 8601'}
                  weekends
                  availableDates={[
                    new Date(2018, 10, 5),
                    new Date(2018, 10, 6),
                    new Date(2018, 10, 7),
                    new Date(2018, 10, 8)
                  ]}
                  onDateSelected={this.handleDateSelected}
              />`}
            </code>
          </div>
        </div>

        <div className="container">
          <h1>Calendar 3</h1>
          <div className="calendar-container">
            <Calendar
              locale={'fr'}
              calendarType={'US'}
              multiSelect
              maxView={'MONTH'}
              onMultiSelect={data => console.log(data)}
              onDateSelected={this.handleDateSelected}
            />
            <code className="calendar-code">
              {`
              <Calendar
                  locale={'fr'}
                  calendarType={'US'}
                  multiSelect
                  maxView={'MONTH'}
                  onMultiSelect={(data)=>console.log(data)}
                  onDateSelected={this.handleDateSelected}
              />`}
            </code>
          </div>
        </div>

        <div className="container">
          <h1>Calendar 4</h1>
          <div className="calendar-container">
            <Calendar
              locale={'ddd'}
              calendarType={'US'}
              onMouseEnterTile={(e, date) =>
                console.log('OnMouseEnter: ', date)
              }
              onDateSelected={this.handleDateSelected}
            />
            <code className="calendar-code">
              {`
              <Calendar
                  locale={'ddd'}
                  calendarType={'US'}
                  onMouseEnterTile={(e,date)=>console.log('OnMouseEnter: ',date)}
                  onDateSelected={this.handleDateSelected}
              />`}
            </code>
          </div>
        </div>
      </div>
    )
  }
}

export default App
