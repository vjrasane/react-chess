import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'
import { maybe } from '../utils'
import PropTypes from 'prop-types'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({ position, piece }) => (
  <div className={'square ' + squareColor(position)} id={position.notation}>
    {piece ? <img src={piece.image} alt="" className="piece" /> : null}
  </div>
)

Square.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    notation: PropTypes.string
  }).isRequired,
  piece: PropTypes.object
}

const pieceAt = ({ pieces }, position) => pieces.find(p => p.position.equals(position))

const CONNECTED = connect(({ history }, { position }) => ({
  piece: maybe(pieceAt(last(history), position), p => p.object)
}))(Square)

export { Square as RawComponent }
export default CONNECTED
