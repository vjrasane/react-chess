import white from '../images/queen_white.png'
import black from '../images/queen_black.png'
import { cardinalMoves, diagonalMoves } from './movement'

export default class Queen {
  static letter = 'Q'
  static type = 'queen'
  constructor(color) {
    this.color = color
    this.image = { white, black }[color]
  }

  moves = (pos, state) => [...cardinalMoves(pos, state), ...diagonalMoves(pos, state)]
}
