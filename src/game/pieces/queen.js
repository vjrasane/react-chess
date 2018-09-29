import white from '../../images/pieces/white/queen.png'
import black from '../../images/pieces/black/queen.png'
import { cardinalMoves, diagonalMoves } from '../movement'
import Piece from './piece'

export default class Queen extends Piece {
  static letter = 'Q'
  static type = 'queen'

  constructor(color) {
    super(Queen, color, { white, black })
  }

  unchecked = (pos, state) => [...cardinalMoves(pos, state), ...diagonalMoves(pos, state)]
}
