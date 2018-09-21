import { cardinals } from '../directions'

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
}

export default Pawn