import white from '../images/rook_white.png'
import black from '../images/rook_black.png'

export default class Rook {
  static type = 'rook'
  static letter = 'R'

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
  }
}
