
import white from '../images/queen_white.png'
import black from '../images/queen_black.png'

export class Queen {
  static letter = "Q"
  static name = "queen"
  constructor(color) {
    this.color = color
    this.image = { white, black }[color] 
  }

  moves(pos, board) {
    // return getDirectionMoves(this, pos, board.state.squares, cardinals_values.concat(diagonals_values));
    return []
  }
}


