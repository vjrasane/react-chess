
import white from '../images/king_white.png'
import black from '../images/king_black.png'

export class King {
  static letter = "K"
  static name = "king"

  constructor(color) {
    this.color = color
    this.image = { white, black }[this.color]
    // this.pawn_checks = this.color === 'white' ? [ [-1,1], [1,1] ] : [ [-1,-1], [1,-1] ]
  }

  moves(pos, board) {
    // var moves = [];
    // var squares = board.state.squares;
    // cardinals_values.concat(diagonals_values).forEach((d) => {
    //   var current = addDir(pos, d);
    //   if(inBounds(current) && (isEmpty(current, squares)
    //     || getPiece(current, squares).color !== this.color)) {
    //     moves.push([current, null]);
    //   }
    // });

    // if(board.state.castling[this.color].includes(1)) {
    //   var row = pos[1];
    //   var kingCol = [2,6];
    //   var sides = ["queenside", "kingside"];
    //   var emptyCols = [
    //     [1,2,3],
    //     [5,6]
    //   ];
    //   var uncheckedCols = [
    //     [2,3,4],
    //     [4,5,6]
    //   ];
    //   board.state.castling[this.color].forEach((allowed, index) => {
    //     if(allowed === 1) {
    //       var emptyPos = emptyCols[index].map((c) => [c, row]);
    //       var uncheckedPos = uncheckedCols[index].map((c) => [c, row]);
    //       if(emptyPos.every((p) => isEmpty(p, squares))) {
    //         if(uncheckedPos.every((p) => !fastReverseCheck(p, this.color, squares)))
    //           moves.push([[kingCol[index], row], "castle " + sides[index]]);
    //       }
    //     }
    //   });
    // }


    return [];
  }
}