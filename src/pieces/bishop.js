import white from '../images/bisop_white.png'
import black from '../images/bishop_black.png'

class Bishop {
  static name = "bishop"
  static letter = "B"

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
  }

  moves(pos, board) {
    // return getDiagonalMoves(this, pos, board.state.squares);
    return []
  }
}

export default Bishop