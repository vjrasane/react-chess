import white from '../images/bishop_white.png'
import black from '../images/bishop_black.png'
import Piece from './piece'
import { diagonalMoves } from '../game/movement'

export default class Bishop extends Piece {
  static type = 'bishop'
  static letter = 'B'

  constructor(color) {
    super(color, { white, black })
  }

  moves = (pos, state) => diagonalMoves(pos, state)
}
