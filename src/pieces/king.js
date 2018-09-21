import white from '../images/king_white.png'
import black from '../images/king_black.png'

export default class King {
  static letter = 'K'
  static type = 'king'

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
    // this.pawn_checks = this.color === 'white' ? [ [-1,1], [1,1] ] : [ [-1,-1], [1,-1] ]
  }
}
