import { cardinals } from '../directions'
import { inBounds } from './movement'
import white from '../images/pawn_white.png'
import black from '../images/pawn_black.png'

class Pawn {
  static type = 'pawn'
  static letter = ''

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]

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
        const piece = state.piece(m)
        if (piece && piece.color !== this.color) {
          moves.push(m)
        } else if(m.equals(state.enpassant)) {
          moves.push({
            target: m,
            type: 'ENPASSANT'
          })
        }
      }
    })
  }
}

export default Pawn
