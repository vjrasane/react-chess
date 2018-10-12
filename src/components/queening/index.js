import React from 'react'
import background from '../../images/indicators/cyan_circle.png'
import { forLetter } from '../../game/state'

const positionStyle = position => {
  const style = {
    left: `${position.x * 12.5}%`
  }
  if (position.y <= 3) {
    style.bottom = '0%'
  } else {
    style.top = `${(7 - position.y) * 12.5}%`
  }
  return style
}

const QueeningIcon = ({ piece }) => (
  <div className="queening-button">
    <img
      className="queening-image-background"
      src={ background } />
    <img
      className="queening-image"
      src={ piece.image } />
  </div>
)

const QueeningMenu = ({ position }) => (
  <div className="queening-overlay">
    <div
      className="queening-menu"
      style={ positionStyle(position) }>
      {'QRBN'.split('').map(l => (
        <QueeningIcon
          key={ l }
          piece={ forLetter(l, 'white') } />
      ))}
    </div>
  </div>
)

export default QueeningMenu