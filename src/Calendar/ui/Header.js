import React from 'react'
import './Header.css'

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Header = () => {
  return (
    <div className="header">
      {days.map((item, idx) => (
        <div className="header-item" key={idx}>
          {item}
        </div>
      ))}
    </div>
  )
}

export default Header
