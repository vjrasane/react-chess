import { cardinals } from '../coordinates'
import { inBounds } from '../state'
import { Move, March, Enpassant } from '../movement'
import white from '../../images/pieces/white/pawn.png'
import black from '../../images/pieces/black/pawn.png'
import Piece from './piece'

export default class Pawn extends Piece {
  static type = 'Pawn'
  static letter = ''

  constructor(color) {
    super(Pawn, color, { white, black }, { white: 1, black: 6 })

    this.direction = { white: cardinals.up, black: cardinals.down }[this.color]
  }

  unchecked = (pos, state) => {
    const moves = []
    const once = pos.to(this.direction)
    if (!state.at(once)) {
      moves.push(new Move(once, pos, this))
      const twice = once.to(this.direction)
      if (pos.y === this.startRow && !state.at(twice)) {
        moves.push(new March(twice, pos, this, once))
      }
    }

    [once.to(cardinals.left), once.to(cardinals.right)].forEach(m => {
      if (inBounds(m)) {
        const piece = state.at(m)
        if (piece && piece.color !== this.color) {
          moves.push(new Move(m, pos, this))
        } else if (state.enpassant && m.equals(state.enpassant.target)) {
          moves.push(new Enpassant(m, pos, this, state.enpassant))
        }
      }
    })
    return moves
  }
}
