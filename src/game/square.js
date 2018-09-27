import React from 'react'
import { connect } from 'react-redux'
import { beginMove, endMove } from '../store/moves'
import PropTypes from 'prop-types'

import legalIndicator from '../images/green_dot.png'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({ position, move, piece, state, beginMove, endMove }) => {
  // handles drop on a square and executes the move if it is legal
  const dropPieceOnSquare = () => move.legal && endMove(move, position)
  // handles a piece drop when it returns to its original square due to illegal move, clearing indicators
  const dropPiece = () => !move.legal && endMove(move, position)
  // handles a begin of a square drag, if there is no piece being dragged already
  const dragPiece = () => !move.source && beginMove(piece, position, state)

  return (
    <div
      className={ 'square ' + squareColor(position) }
      onDrop={ dropPieceOnSquare }
      onDragOver={ ev => ev.preventDefault() }
      id={ position.notation() }>
      {piece && <img
        src={ piece.image }
        onDragStart={ dragPiece }
        onDragEnd={ dropPiece }
        alt=""
        className="piece" />}
      {move.legal && <img
        src={ legalIndicator }
        className="indicator" />}
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

const mapStateToProps = (/* store */ { moves }, /* props */ { position }) => ({
  move: {
    // store move source and piece
    ...moves,
    legal:
      // any legal moves for currently dragged piece?
      moves.legal &&
      // is this square one of the legal moves?
      moves.legal.some(m => (m.target ? m.target.equals(position) : m.equals(position)))
  }
})

const actionCreators = { beginMove, endMove }

const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(Square)

export { Square as RawComponent }
export default CONNECTED
