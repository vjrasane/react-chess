import white from '../images/king_white.png'
import black from '../images/king_black.png'
import Piece from './piece'
import { cardinals, diagonals } from '../coordinates'
import { times, last } from 'lodash'
export default class King extends Piece {
  static letter = 'K'
  static type = 'king'

  constructor(color) {
    super(color, { white, black })
  }

  castling = (pos, state) => {
    const castle = (pos, state, dir, empty) => {
      const unchecked = times(2, n => pos.to(dir.times(n + 1)))
      const empties = times(empty, n => pos.to(dir.times(n + 1)))
      // check unchecked (lel)
      if (empties.every(p => !state.at(p))) {
        return { type: 'CASTLE', target: last(unchecked) }
      }
      return false
    }

    const queens = (pos, state) => castle(pos, state, cardinals.left, 3)
    const kings = (pos, state) => castle(pos, state, cardinals.right, 2)

    return state.castling[this.color].reduce((acc, curr) => {
      const move = { kings, queens }[curr](pos, state)
      return move ? [...acc, move] : acc
    }, [])
  }

  moves = (pos, state) =>
    // normal one square king moves
    Object.values({ ...cardinals, ...diagonals })
      .map(d => pos.to(d))
      .filter(m => {
        const piece = state.at(m)
        return !piece || piece.color !== this.color
      })
      .concat(
        // castling moves
        this.castling(pos, state)
      )
}
