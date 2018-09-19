import React from "react";

const cardinals = { up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0] };
const cardinals_values = Object.keys(cardinals).map(k => cardinals[k]);

const diagonals = {
  left_up: [-1, 1],
  left_down: [-1, -1],
  right_up: [1, 1],
  right_down: [1, -1]
};
const diagonals_values = Object.keys(diagonals).map(k => diagonals[k]);

const columnLetter = i => String.fromCharCode(97 + i);
const columnNum = i => i.charCodeAt(0) - 97;

const toChessCoord = a => columnLetter(a[0]) + (a[1] + 1); // + (a[1] + 1) };
const toCoordArray = c => [columnNum(c), c[1] - 1];

function inBounds(m) {
  const x = m[0];
  const y = m[1];
  if (x < 0 || x > 7) return false;
  if (y < 0 || y > 7) return false;
  return true;
}

// "Fast"
function fastReverseCheck(pos, color, squares) {
  var knight = knight_moves.find(m => {
    var moved = addDir(pos, m);
    if (!inBounds(moved)) return false;

    var p = getPiece(moved, squares);
    if (p && p.color !== color && p.name === "knight") {
      // console.log("knight checking")
      return true;
    } else {
      return false;
    }
  });
  if (knight) return true;

  var diagonalHits = getDirectionHits(pos, squares, diagonals_values);
  if (
    diagonalHits.find(
      h => h.color !== color && (h.name === "bishop" || h.name === "queen")
    )
  )
    return true;

  var cardinalHits = getDirectionHits(pos, squares, cardinals_values);
  // console.log(cardinalHit);
  if (
    cardinalHits.find(
      h => h.color !== color && (h.name === "rook" || h.name === "queen")
    )
  )
    return true;

  var pawn = diagonals_values.find(d => {
    var current = addDir(pos, d);
    if (!inBounds(current)) return false;

    var p = getPiece(current, squares);
    if (p && p.color !== color && p.name === "pawn") {
      var diff = pos[1] - current[1];
      // console.log(diff, p.direction[1])
      if (diff === p.direction[1]) return true;
    }
    return false;
  });
  if (pawn) return true;

  var king = diagonals_values.concat(cardinals_values).find(d => {
    var current = addDir(pos, d);
    if (!inBounds(current)) return false;

    var p = getPiece(current, squares);
    if (p && p.color !== color && p.name === "king") {
      return true;
    } else return false;
  });
  if (king) return true;

  return false;
}

export function isCheck(pos, squares) {
  var king = squares[pos[0]][pos[1]];
  return fastReverseCheck(pos, king.color, squares);
}

export function getLegalMoves(pos, piece, board) {
  var moves = piece.moves(pos, board);

  return moves.filter(m => {
    var movedState = board.executeMove(
      toChessCoord(pos),
      toChessCoord(m[0]),
      m[1]
    );
    // console.log(movedState)
    var kingpos = movedState.kingpos[piece.color];
    // console.log(kingpos);
    var check = isCheck(toCoordArray(kingpos), movedState.squares);

    // console.log(m + " -> " + check)
    return !check;
  });
}

function dragPiece(ev, board) {
  const sourceSquare = ev.target.parentElement;
  const piece = ev.target;

  const sourceRow = parseInt(sourceSquare.id[1], 10) - 1;
  const sourceCol = columnNum(sourceSquare.id);

  const sourcePiece = board.state.squares[sourceCol][sourceRow];

  var moves = getLegalMoves([sourceCol, sourceRow], sourcePiece, board);
  // var moves = sourcePiece.moves([sourceCol, sourceRow], board);
  var moveMap = {};
  moves.forEach(m => {
    moveMap[toChessCoord(m[0])] = m[1];
  });

  board.setState({
    moves: moveMap
  });

  ev.dataTransfer.setData("sourceSquareId", sourceSquare.id);
  ev.dataTransfer.setData("draggedPieceId", piece.id);
}

function dragStop(ev, board) {
  board.setState({
    moves: []
  });
}

var not_found = require("./images/not-found.png");
class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.color = props.color;
    this.name = props.name;
    this.image = not_found;
    this.board = props.board;
    this.num = props.id;
    this.id = this.name + "_" + this.color + "_" + props.id;

    this.onclick = props.onclick ? props.onclick : ev => {};
  }

  render(draggable) {
    return (
      <img
        id={this.id}
        src={this.image}
        alt=""
        className="piece"
        draggable={draggable}
        onDragStart={ev => dragPiece(ev, this.board)}
        onDragEnd={ev => dragStop(ev, this.board)}
        onClick={ev => this.onclick(ev)}
        // onDragOver={(ev) => dragover(ev)}
        // onDrop={(ev) => parentdrop(ev)}
      />
    );
  }
}

function getDirectionHits(pos, squares, directions) {
  var pieces = [];
  directions.forEach(d => {
    var current = addDir(pos, d);
    while (inBounds(current) && isEmpty(current, squares)) {
      current = addDir(current, d);
    }
    // console.log(current)
    if (inBounds(current)) {
      pieces.push(getPiece(current, squares));
    }
  });
  return pieces;
}

function getDirectionMoves(piece, pos, squares, directions) {
  var moves = [];
  directions.forEach(d => {
    var current = addDir(pos, d);
    while (inBounds(current) && isEmpty(current, squares)) {
      moves.push([current, null]);
      current = addDir(current, d);
    }
    if (inBounds(current) && getPiece(current, squares).color !== piece.color)
      moves.push([current, "take"]);
  });
  return moves;
}

function getDiagonalMoves(piece, pos, squares) {
  return getDirectionMoves(piece, pos, squares, diagonals_values);
}

function getCardinalMoves(piece, pos, squares) {
  return getDirectionMoves(piece, pos, squares, cardinals_values);
}

function getPiece(pos, squares) {
  return squares[pos[0]][pos[1]];
}

function filterOwnPieces(moves, color, squares) {
  // console.log(moves)
  return moves.filter(m => {
    var p = getPiece(m[0], squares);
    return !p || p.color !== color;
  });
}

function addDir(m, dir) {
  return [m[0] + dir[0], m[1] + dir[1]];
}

function isEmpty(pos, squares) {
  return !squares[pos[0]][pos[1]];
}

var pawn_white = require("./images/pawn_white.png");
const pawn_black = require("./images/pawn_black.png");
export class Pawn extends Piece {
  constructor(props) {
    props.name = "pawn";
    super(props);

    this.letter = "";
    this.image = this.color === "white" ? pawn_white : pawn_black;
    this.direction = this.color === "white" ? cardinals.up : cardinals.down;
    this.startRow = this.color === "white" ? 1 : 6;
  }

  moves(pos, board) {
    var moves = [];
    var squares = board.state.squares;
    var forward = addDir(pos, this.direction);

    if (isEmpty(forward, squares)) {
      if (forward[1] === this.startRow + this.direction[1] * 6)
        moves.push([forward, "queen"]);
      else moves.push([forward, null]);
    }

    if (pos[1] === this.startRow) {
      var twice = addDir(forward, this.direction);
      if (isEmpty(twice, squares)) moves.push([twice, "march"]);
    }

    [addDir(forward, cardinals.left), addDir(forward, cardinals.right)].forEach(
      m => {
        if (inBounds(m)) {
          let piece = getPiece(m, squares);
          if (piece && piece.color !== this.color)
            if (forward[1] === this.startRow + this.direction[1] * 6)
              moves.push([m, "queen"]);
            else moves.push([m, null]);
        }
      }
    );

    if (
      board.state.enpassant &&
      pos[1] === this.startRow + this.direction[1] * 3
    ) {
      var enpassantDir = columnNum(board.state.enpassant) - pos[0];
      if (Math.abs(enpassantDir) === 1) {
        moves.push([addDir(forward, [enpassantDir, 0]), "enpassant"]);
      }
    }

    return moves;
  }
}

var rook_white = require("./images/rook_white.png");
var rook_black = require("./images/rook_black.png");
export class Rook extends Piece {
  constructor(props) {
    props.name = "rook";
    super(props);

    this.letter = "R";
    this.image = this.color === "white" ? rook_white : rook_black;
  }

  moves(pos, board) {
    return getCardinalMoves(this, pos, board.state.squares);
  }
}

const knight_white = require("./images/knight_white.png");
const knight_black = require("./images/knight_black.png");
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
export class Knight extends Piece {
  constructor(props) {
    props.name = "knight";
    super(props);

    this.letter = "N";
    this.image = this.color === "white" ? knight_white : knight_black;
  }

  moves(pos, board) {
    var moves = knight_moves
      .map(k => [addDir(pos, k), null])
      .filter(m => inBounds(m[0]));
    moves = filterOwnPieces(moves, this.color, board.state.squares);
    return moves;
  }
}

var bishop_white = require("./images/bishop_white.png");
var bishop_black = require("./images/bishop_black.png");
export class Bishop extends Piece {
  constructor(props) {
    props.name = "bishop";
    super(props);

    this.letter = "B";
    this.image = this.color === "white" ? bishop_white : bishop_black;
  }

  moves(pos, board) {
    return getDiagonalMoves(this, pos, board.state.squares);
  }
}

var queen_white = require("./images/queen_white.png");
var queen_black = require("./images/queen_black.png");
export class Queen extends Piece {
  constructor(props) {
    props.name = "queen";
    super(props);

    this.letter = "Q";
    this.image = this.color === "white" ? queen_white : queen_black;
  }

  moves(pos, board) {
    return getDirectionMoves(
      this,
      pos,
      board.state.squares,
      cardinals_values.concat(diagonals_values)
    );
  }
}

var king_white = require("./images/king_white.png");
var king_black = require("./images/king_black.png");

export class King extends Piece {
  constructor(props) {
    props.name = "king";
    super(props);

    this.letter = "K";
    this.image = this.color === "white" ? king_white : king_black;
    // this.pawn_checks = this.color === 'white' ? [ [-1,1], [1,1] ] : [ [-1,-1], [1,-1] ]
  }

  moves(pos, board) {
    var moves = [];
    var squares = board.state.squares;
    cardinals_values.concat(diagonals_values).forEach(d => {
      var current = addDir(pos, d);
      if (
        inBounds(current) &&
        (isEmpty(current, squares) ||
          getPiece(current, squares).color !== this.color)
      ) {
        moves.push([current, null]);
      }
    });

    if (board.state.castling[this.color].includes(1)) {
      var row = pos[1];
      var kingCol = [2, 6];
      var sides = ["queenside", "kingside"];
      var emptyCols = [[1, 2, 3], [5, 6]];
      var uncheckedCols = [[2, 3, 4], [4, 5, 6]];
      board.state.castling[this.color].forEach((allowed, index) => {
        if (allowed === 1) {
          var emptyPos = emptyCols[index].map(c => [c, row]);
          var uncheckedPos = uncheckedCols[index].map(c => [c, row]);
          if (emptyPos.every(p => isEmpty(p, squares))) {
            if (
              uncheckedPos.every(p => !fastReverseCheck(p, this.color, squares))
            )
              moves.push([[kingCol[index], row], "castle " + sides[index]]);
          }
        }
      });
    }

    return moves;
  }
}
