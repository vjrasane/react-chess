import white from '../../images/pieces/white/king.png'
import black from '../../images/pieces/black/king.png'
import Piece from './piece'
import { Move, Castle } from '../movement'
import { cardinals, diagonals } from '../coordinates'
import { times, last } from 'lodash'
import { inBounds } from '../state'

export default class King extends Piece {
  static letter = 'K'
  static type = 'King'

  constructor(color) {
    super(King, color, { white, black })
  }

  castling = (pos, state) => {
    const castle = (side, pos, state, dir, emptyNum) => {
      const uncheckedSquares = times(3, n => pos.to(dir.times(n)))
      const emptySquares = times(emptyNum, n => pos.to(dir.times(n + 1)))

      const unchecked = uncheckedSquares.every(p => !state.check(p, this.color))
      const empty = emptySquares.every(p => !state.at(p))
      return empty && unchecked ? new Castle(last(uncheckedSquares), pos, this, side) : false
    }

    const queens = (pos, state) => castle('queens', pos, state, cardinals.left, 3)
    const kings = (pos, state) => castle('kings', pos, state, cardinals.right, 2)

    const moves = state.castling[this.color].reduce((acc, curr) => {
      const move = { kings, queens }[curr](pos, state)
      return move ? [...acc, move] : acc
    }, [])
    return moves
  }

  takes = (pos, state) =>
    Object.values({ ...cardinals, ...diagonals })
      .filter(d => {
        if (inBounds(pos.to(d))) {
          const piece = state.at(pos.to(d))
          return !piece || piece.color !== this.color
        }
      })
      .map(d => new Move(pos.to(d), pos, this))

  unchecked = (pos, state) => [...this.takes(pos, state), ...this.castling(pos, state)]
}
