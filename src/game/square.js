import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'
import { maybe } from '../utils'
import { beginMove, endMove } from '../store/moves'
import PropTypes from 'prop-types'

const squareColor = pos => ['black', 'white'][(pos.x + pos.y) % 2]

const Square = ({
  position,
  move,
  color,
  piece,
  state,
  beginMove,
  endMove
}) => {
  const dropPiece = () => endMove(move, position)
  const dragPiece = () => beginMove(piece, position, state)

  return (
    <div
      className={'square ' + color}
      onDrop={dropPiece}
      onDragOver={ev => ev.preventDefault()}
      id={position.notation}
    >
      {piece ? (
        <img
          src={piece.image}
          onDragStart={dragPiece}
          alt=""
          className="piece"
        />
      ) : null}
    </div>
  )
}

Square.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    notation: PropTypes.string
  }).isRequired,
  piece: PropTypes.object
}

const mapStateToProps = (
  /* state */ { history, moves },
  /* props */ { position }
) => ({
  state: last(history),
  move: {
    legal:
      // any legal moves for currently dragged piece?
      moves.legal &&
      // is this square one of the legal moves?
      moves.legal.some(
        m => (m.target ? m.target.equals(position) : m.equals(position))
      ),
    // store move source
    source: moves.source
  }
})

const actionCreators = { beginMove, endMove }

const mergeProps = ({ move, state }, dispatch, { position }) => ({
  // determine color based on position and move legality
  color: move.legal ? 'green' : squareColor(position),
  // get piece from board state
  piece: maybe(state.at(position), p => p.object),
  // pass rest of required props
  position,
  move,
  state,
  ...dispatch
})

const CONNECTED = connect(
  mapStateToProps,
  actionCreators,
  mergeProps
)(Square)

export { Square as RawComponent }
export default CONNECTED
