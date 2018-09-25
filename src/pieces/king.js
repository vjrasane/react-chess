import white from '../images/king_white.png'
import black from '../images/king_black.png'
import Piece from './piece'
import { cardinals, diagonals } from '../directions'

export default class King extends Piece {
  static letter = 'K'
  static type = 'king'

  constructor(color) {
    super(color, { white, black })
  }
  // this.pawn_checks = this.color === 'white' ? [ [-1,1], [1,1] ] : [ [-1,-1], [1,-1] ]
  // }
  moves = (pos, state) =>
    Object.values({ ...cardinals, ...diagonals }).reduce((acc, dir) => {
      const move = pos.to(dir)
      const piece = state.at(move)
      return !piece || piece.color !== this.color ? [...acc, move] : acc
    }, [])
}
