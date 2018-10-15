import React from 'react'
// import PropTypes from 'prop-types'
import Tile from './Tile'
import './Grid.css'
const Grid = ({ num }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return (
    <div className={`grid${num ? ' grid-dates' : ' grid-months'}`}>
      {num
        ? Array(+num)
            .fill()
            .map((item, idx) => idx + 1)
            .map((n, idx) => <Tile key={idx} val={n} datesType />)
        : months.map((n, idx) => <Tile key={idx} val={n} />)}
    </div>
  )
}

// Grid.propTypes = {
// }

export default Grid
