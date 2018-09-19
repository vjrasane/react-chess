import { cardinals } from "../directions";

import white from "../images/pawn_white.png";
import black from "../images/pawn_black.png";

export class Pawn {
  static name = "pawn";
  static letter = "";

  constructor(color) {
    this.color = color;
    this.image = { white, black }[this.color];

    this.direction = { white: cardinals.up, black: cardinals.down }[this.color];
    this.startRow = { white: 1, black: 6 }[this.color];
  }

  moves(pos, board) {
    // var moves = [];
    // var squares = board.state.squares;
    // var forward = addDir(pos, this.direction)

    // if(isEmpty(forward, squares)) {
    //   if(forward[1] === this.startRow + this.direction[1] * 6)
    //     moves.push([forward, 'queen']);
    //   else
    //     moves.push([forward, null]);
    // }

    // if(pos[1] === this.startRow) {
    //   var twice = addDir(forward, this.direction)
    //   if(isEmpty(twice, squares))
    //     moves.push([twice, "march"]);
    // }

    // [ addDir(forward, cardinals.left), addDir(forward, cardinals.right) ].forEach((m)=>{
    //   if(inBounds(m)) {
    //     let piece = getPiece(m, squares);
    //     if(piece && piece.color !== this.color)
    //       if(forward[1] === this.startRow + this.direction[1] * 6)
    //         moves.push([m, 'queen']);
    //       else
    //         moves.push([m, null]);
    //   }
    // });

    // if(board.state.enpassant && pos[1] === this.startRow + this.direction[1] * 3) {
    //   var enpassantDir = columnNum(board.state.enpassant) - pos[0];
    //   if(Math.abs(enpassantDir) === 1) {
    //     moves.push([addDir(forward, [enpassantDir, 0]), "enpassant"])
    //   }
    // }

    return [];
  }
}

export default Pawn;
