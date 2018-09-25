import white from '../images/rook_white.png'
import black from '../images/rook_black.png'
import { cardinalMoves } from './movement'
import Piece from './piece'

export default class Rook extends Piece {
  static type = 'rook'
  static letter = 'R'

  constructor(color) {
    super(color, { white, black })
  }

  moves = (pos, state) => cardinalMoves(pos, state)
}
