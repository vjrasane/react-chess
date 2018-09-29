import white from '../../images/pieces/white/bishop.png'
import black from '../../images/pieces/black/bishop.png'
import Piece from './piece'
import { diagonalMoves } from '../movement'

export default class Bishop extends Piece {
  static letter = 'B'
  static type = 'Bishop'

  constructor(color) {
    super(Bishop, color, { white, black })
  }

  unchecked = (pos, state) => diagonalMoves(pos, state)
}
