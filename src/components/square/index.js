import React from 'react'
import { connect } from 'react-redux'
import { Queening } from '../../game/movement'
import { beginMove, endMove } from '../../store/moves'
import { beginQueening } from '../../store/queening'
import Indicator from '../indicator'

import './index.css'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({ move, piece, position, state, status, beginMove, endMove, beginQueening }) => {
  // handles drop on a square and executes the move if it is legal
  const dropPieceOnSquare = () => move.here && move.here instanceof Queening ? beginQueening(move.here) : endMove(move.here)
  // handles a piece drop when it returns to its original square due to illegal move, clearing indicators
  const dropPiece = () => !move.here && endMove()
  // handles a begin of a square drag, if there is no piece being dragged already
  const dragPiece = () => move.allowed && piece.color === state.turn && beginMove(piece.moves(position, state))

  return (
    <div
      className={ `square ${squareColor(position)}` }
      onDrop={ dropPieceOnSquare }
      onDragOver={ ev => ev.preventDefault() }
      id={ position.notation() }
    >
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

const mapStateToProps = (/* store */ { moves, states }, /* props */ { piece, position, state }) => ({
  status: piece && piece.type === 'King' && piece.color === state.turn && state.status,
  move: {
    allowed:
      !states.selected && // not viewing history
      !states.result && // game has not ended
      piece && // there is a piece on this square
      piece.color === state.turn && // piece color is in turn
      !moves.length, // and no previous move is in progress
    here: moves.find(m => m.target.equals(position)) // move on this square
  }
})

const actionCreators = { beginMove, endMove, beginQueening }

const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(Square)

export { Square as RawComponent }
export default CONNECTED
