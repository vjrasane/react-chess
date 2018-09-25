import white from '../images/bishop_white.png'
import black from '../images/bishop_black.png'
import { diagonalMoves } from './movement'

export default class Bishop {
  static type = 'bishop'
  static letter = 'B'

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
  }

  moves = (pos, state) => diagonalMoves(pos, state)
}
