import white from '../images/knight_white.png'
import black from '../images/knight_black.png'
import { Move } from '../game/movement'
import Piece from './piece'
import { cardinals, diagonals } from '../game/coordinates'

const jumps = [
  cardinals.up.to(diagonals.left_up),
  cardinals.up.to(diagonals.right_up),
  cardinals.down.to(diagonals.right_down),
  cardinals.down.to(diagonals.left_down),
  cardinals.left.to(diagonals.left_up),
  cardinals.left.to(diagonals.left_down),
  cardinals.right.to(diagonals.right_up),
  cardinals.right.to(diagonals.right_down)
]

export default class Knight extends Piece {
  static letter = 'N'
  static type = 'knight'

  constructor(color) {
    super(color, { white, black })
  }

  moves = (pos, state) =>
    jumps.map(j => new Move(pos.to(j), pos, this)).filter(m => {
      const piece = state.at(m.target)
      return !piece || piece.color !== this.color
    })
}
