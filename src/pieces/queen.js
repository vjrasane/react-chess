import white from '../images/queen_white.png'
import black from '../images/queen_black.png'
import { cardinalMoves, diagonalMoves } from './movement'
import Piece from './piece'

export default class Queen extends Piece {
  static letter = 'Q'
  static type = 'queen'

  constructor(color) {
    super(color, { white, black })
  }

  moves = (pos, state) => [...cardinalMoves(pos, state), ...diagonalMoves(pos, state)]
}
