import white from '../../images/pieces/white/rook.png'
import black from '../../images/pieces/black/rook.png'
import { cardinalMoves } from '../movement'
import Piece from './piece'

export default class Rook extends Piece {
  static type = 'Rook'
  static letter = 'R'

  constructor(color) {
    super(Rook, color, { white, black })
  }

  unchecked = (pos, state) => cardinalMoves(pos, state)
}
