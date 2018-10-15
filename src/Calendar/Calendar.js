import React, { Component } from 'react'
import Grid from './ui/Grid'
import Header from './ui/Header'
import Navigation from './ui/Navigation'

export default class Calendar extends Component {
  render() {
    return (
      <div
        style={{ width: 300, border: '1px solid lightgray', borderRadius: 5 }}
      >
        <Navigation />
        <Header />
        <Grid num={42} />
      </div>
    )
  }
}
