import white from '../images/rook_white.png'
import black from '../images/rook_black.png'

class Rook {
  static name = "rook"
  static letter = "R"

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
  }

  moves(pos, board) {
    // return getCardinalMoves(this, pos, board.state.squares);
    return []
  }
}

export default Rook