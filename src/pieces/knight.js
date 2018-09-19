import white from "../images/knight_white.png";
import black from "./images/knight_black.png";

const knight_moves = [
  [-2, 1],
  [-2, -1],
  [2, 1],
  [2, -1],
  [-1, 2],
  [1, 2],
  [-1, -2],
  [1, -2]
];

class Knight {
  static letter = "N"
  static name = "knight"

  constructor(color) {
    this.color = color
    this.image = { white, black }[color]
  }

  moves(pos, board) {
    // var moves = knight_moves
    //   .map(k => [addDir(pos, k), null])
    //   .filter(m => inBounds(m[0]));
    // moves = filterOwnPieces(moves, this.color, board.state.squares);
    return [];
  }
}

export default Knight
