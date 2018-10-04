import React from 'react'
import { connect } from 'react-redux'
import { beginMove, endMove } from '../../store/moves'
import PropTypes from 'prop-types'
import Indicator from '../indicator'

import './index.css'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({ move, piece, position, state, status, beginMove, endMove }) => {
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
      id={ position.notation() }>
      {status && <Indicator type={ status } />}
      {piece && <img
        src={ piece.image }
        onDragStart={ dragPiece }
        onDragEnd={ dropPiece }
        alt=""
        className="piece" />}
      {move.here && <Indicator type={ 'move' } />}
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
  status: piece && piece.type === 'King' && piece.color === state.turn && state.status,
  move: {
    allowed: !states.result && piece && piece.color === state.turn && !moves.length,
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
