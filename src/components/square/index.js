import React from 'react'
import { connect } from 'react-redux'
import { beginMove, endMove } from '../../store/moves'
import PropTypes from 'prop-types'

import checkIndicator from '../../images/indicators/orange_glow.png'
import checkmateIndicator from '../../images/indicators/red_glow.png'
import stalemateIndicator from '../../images/indicators/blue_glow.png'
import moveIndicator from '../../images/indicators/green_dot.png'

import './index.css'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({ move, piece, position, state, check, beginMove, endMove }) => {
  // handles drop on a square and executes the move if it is legal
  const dropPieceOnSquare = () => move.here && endMove(move.here)
  // handles a piece drop when it returns to its original square due to illegal move, clearing indicators
  const dropPiece = () => !move.here && endMove()
  // handles a begin of a square drag, if there is no piece being dragged already
  const dragPiece = () => move.allowed && piece.color === state.turn && beginMove(piece.moves(position, state))

  return (
    <div
      className={ 'square ' + squareColor(position) }
      onDrop={ dropPieceOnSquare }
      onDragOver={ ev => ev.preventDefault() }
      id={ position.notation() }
    >
      {check && <img
        src={ checkIndicator }
        className="indicator check" />}
      {piece && <img
        src={ piece.image }
        onDragStart={ dragPiece }
        onDragEnd={ dropPiece }
        alt=""
        className="piece" />}
      {move.here && <img
        src={ moveIndicator }
        className="indicator move" />}
    </div>
  )
}

Square.propTypes = {
  position: PropTypes.shape({
    notation: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  piece: PropTypes.object
}

const mapStateToProps = (/* store */ { moves, states }, /* props */ { piece, position, state }) => ({
  check: piece && piece.type === 'King' && state.check(position, piece.color),
  move: {
    allowed: !states.selected && piece && piece.color === state.turn && !moves.length,
    here: moves.find(m => m.target.equals(position)) // move on this square
  }
})

const actionCreators = { beginMove, endMove }

const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(Square)

export { Square as RawComponent }
export default CONNECTED
