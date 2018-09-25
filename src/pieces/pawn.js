import { cardinals } from '../directions'
import { inBounds } from '../state'
import white from '../images/pawn_white.png'
import black from '../images/pawn_black.png'
import Piece from './piece'

export default class Pawn extends Piece {
  static type = 'pawn'
  static letter = ''

  constructor(color) {
    super(color, { white, black })

    this.direction = { white: cardinals.up, black: cardinals.down }[this.color]
    this.startRow = { white: 1, black: 6 }[this.color]
  }

  moves = (pos, state) => {
    const moves = []
    const once = pos.to(this.direction)
    if (!state.at(once)) {
      moves.push(once)
      const twice = once.to(this.direction)
      if (pos.y === this.startRow && !state.at(twice)) {
        moves.push({
          target: twice,
          type: 'DOUBLE'
        })
      }
    }

    [once.to(cardinals.left), once.to(cardinals.right)].forEach(m => {
      if (inBounds(m)) {
        const piece = state.at(m)
        if (piece && piece.color !== this.color) {
          moves.push(m)
        } else if (state.enpassant && m.equals(state.enpassant)) {
          moves.push({
            target: m,
            type: 'ENPASSANT'
          })
        }
      }
    })
    return moves
  }
}
