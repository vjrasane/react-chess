import React from 'react'
import check from '../../images/indicators/orange_glow.png'
import checkmate from '../../images/indicators/red_glow.png'
import stalemate from '../../images/indicators/blue_glow.png'
import move from '../../images/indicators/green_dot.png'

import './index.css'

const indicators = {
  check,
  checkmate,
  stalemate,
  move
}

const Indicator = ({ type }) => (
  <img
    src={ indicators[type] }
    className={ `indicator ${type}` } />
)

export default Indicator
