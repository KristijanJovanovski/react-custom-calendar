import React from 'react'
import './Navigation.css'

const Navigation = () => {
  return (
    <div className="navigation">
      <div className={`nav-item`}> {'<<'}</div>
      <div className={`nav-item`}> {'<'}</div>
      <div className={`nav-item`}> {'October 2018'}</div>
      <div className={`nav-item`}> {'>'}</div>
      <div className={`nav-item`}> {'>>'}</div>
    </div>
  )
}

export default Navigation
