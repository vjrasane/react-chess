import white from '../images/king_white.png'
import black from '../images/king_black.png'
import Piece from './piece'
import { Move, Castle } from '../game/movement'
import { cardinals, diagonals } from '../game/coordinates'
import { times, last } from 'lodash'
export default class King extends Piece {
  static letter = 'K'
  static type = 'king'

  constructor(color) {
    super(color, { white, black })
  }

  castling = (pos, state) => {
    const castle = (side, pos, state, dir, empty) => {
      const unchecked = times(2, n => pos.to(dir.times(n + 1)))
      const empties = times(empty, n => pos.to(dir.times(n + 1)))
      // check unchecked (lel)
      if (empties.every(p => !state.at(p))) {
        return new Castle(last(unchecked), pos, this, side)
      }
      return false
    }

    const queens = (pos, state) => castle('queens', pos, state, cardinals.left, 3)
    const kings = (pos, state) => castle('kings', pos, state, cardinals.right, 2)

    return state.castling[this.color].reduce((acc, curr) => {
      const move = { kings, queens }[curr](pos, state)
      return move ? [...acc, move] : acc
    }, [])
  }

  moves = (pos, state) =>
    // normal one square king moves
    Object.values({ ...cardinals, ...diagonals })
      .map(d => new Move(pos.to(d), pos, this))
      .filter(m => {
        const piece = state.at(m.target)
        return !piece || piece.color !== this.color
      })
      .concat(
        // castling moves
        this.castling(pos, state)
      )
}
