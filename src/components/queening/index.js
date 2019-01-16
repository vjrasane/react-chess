import React from 'react'
import { connect } from 'react-redux'
import background from '../../images/indicators/cyan_circle.png'
import { endQueening } from '../../store/queening'
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
      src={ piece.image }
      onClick={ () => console.log(piece) } />
  </div>
)

const QueeningMenu = ({ queening, endQueening }) => {
  return (
    queening ? <div
      className="queening-overlay"
      onClick={ endQueening }>
      <div
        className="queening-menu"
        style={ positionStyle(queening) }>
        {'QRBN'.split('').map(l => (
          <QueeningIcon
            key={ l }
            piece={ forLetter(l, 'white') } />
        ))}
      </div>
    </div> : null
  )
}

const mapStateToProps = (/* store */ { queening }) => ({
  queening: queening && queening.move
})
const actionCreators = { endQueening }
const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(QueeningMenu)

export { QueeningMenu as RawComponent }
export default CONNECTED
