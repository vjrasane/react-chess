import { cardinals } from '../game/coordinates'
import { inBounds } from '../game/state'
import { Move } from '../game/movement'
import white from '../images/pawn_white.png'
import black from '../images/pawn_black.png'
import Piece from './piece'

export default class Pawn extends Piece {
  static type = 'pawn'
  static letter = ''

  constructor(color) {
    super(color, { white, black }, { white: 1, black: 6 })

    this.direction = { white: cardinals.up, black: cardinals.down }[this.color]
  }

  moves = (pos, state) => {
    const moves = []
    const once = pos.to(this.direction)
    if (!state.at(once)) {
      moves.push(new Move(once, pos, this))
      const twice = once.to(this.direction)
      if (pos.y === this.startRow && !state.at(twice)) {
        // TODO: double move
        moves.push(new Move(twice, pos, this))
      }
    }

    [once.to(cardinals.left), once.to(cardinals.right)].forEach(m => {
      if (inBounds(m)) {
        const piece = state.at(m)
        if (piece && piece.color !== this.color) {
          moves.push(new Move(m, pos, this))
        } else if (state.enpassant && m.equals(state.enpassant)) {
          // TODO: enpassant move
          moves.push(new Move(m, pos, this))
        }
      }
    })
    return moves
  }
}
