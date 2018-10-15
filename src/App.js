import React, { Component } from 'react'
import './App.css'
import Calendar from './Calendar/Calendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <Calendar />
      </div>
    )
  }
}

export default App
