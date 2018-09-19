import React from "react";
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
  isCheck,
  getLegalMoves
} from "./pieces.js";

const columnLetter = i => String.fromCharCode(97 + i);
const columnNum = i => i.charCodeAt(0) - 97;

const toChessCoord = a => columnLetter(a[0]) + (parseInt(a[1], 10) + 1); // + (a[1] + 1) };
const toCoordArray = c => [columnNum(c), c[1] - 1];

function dragOverSquare(ev) {
  ev.preventDefault();
}

function dropOnSquare(ev, board) {
  ev.preventDefault();

  var targetSquare = ev.target;
  if (targetSquare.classList.contains("piece"))
    targetSquare = ev.target.parentElement;

  var sourceId = ev.dataTransfer.getData("sourceSquareId");
  var targetId = targetSquare.id;

  if (targetId === sourceId) {
    console.log("No move");
    return;
  }

  if (targetId in board.state.moves) {
    var moveType = board.state.moves[targetId];
    if (moveType === "queen") {
      board.setState({
        status: "queen_query"
      });
    } else {
      var state = board.executeMove(sourceId, targetId, moveType);

      board.state.squares = state.squares;
      board.state.kingpos = state.kingpos;

      var turnPlayer = players[state.turn];
      var kingpos = state.kingpos[turnPlayer];
      var inCheck = isCheck(toCoordArray(kingpos), state.squares);

      var legalMoves = false;
      for (let i = 0; i < state.squares.length; i++) {
        for (let j = 0; j < state.squares[i].length; j++) {
          var piece = state.squares[i][j];
          if (
            piece &&
            piece.color === turnPlayer &&
            getLegalMoves([i, j], piece, board).length > 0
          )
            legalMoves = true;
        }
      }

      var status = null;
      if (inCheck) {
        if (legalMoves) status = "check";
        else status = "checkmate";
      } else if (!legalMoves) {
        status = "stalemate";
      }

      state.status = status;
      board.setState(state);
    }
  } else {
    console.log("Illegal move!");
  }
}

// function copyMap(map){
//   var newmap = {}
//   Object.keys(map).forEach((k) => newmap[k] = map[k])
//   return newmap;
// }

function Square(props) {
  return (
    <div
      id={columnLetter(props.column) + (parseInt(props.row, 10) + 1)}
      className={"square " + props.color}
      index={props.index}
      column={columnLetter(props.column)}
      key={columnLetter(props.column)}
      row={props.row}
      onDrop={props.onDropHandler}
      onDragOver={ev => dragOverSquare(ev)}
    >
      {/* {props.content != null ? props.content.name : null} */}
      {props.piece
        ? props.piece.render(props.turnPlayer === props.piece.color)
        : null}
    </div>
  );
}

function Coordinate(props) {
  return (
    <button className={"coordinate " + props.alignment} key={props.label}>
      {props.label}
    </button>
  );
}

function QueenQuery(props) {
  var piece = C =>
    new C({
      color: props.color,
      id: 0,
      onclick: ev => {
        alert("yolo");
      }
    });
  return (
    <div id="queen_query" className="queen_query">
      <div className="pieceButton">{piece(Queen).render(false)}</div>
      <div className="pieceButton">{piece(Rook).render(false)}</div>
      <div className="pieceButton">{piece(Bishop).render(false)}</div>
      <div className="pieceButton">{piece(Knight).render(false)}</div>
    </div>
  );
}

const players = ["white", "black"];
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.initialState(),
      moves: [],
      enpassant: null,
      kingpos: { black: "e8", white: "e1" },
      castling: { black: [1, 1], white: [1, 1] },
      turn: 0,
      status: null
    };
  }

  inTurn() {
    return players[this.state.turn];
  }

  opponent() {
    return players[(this.state.turn + 1) % players.length];
  }

  executeMove(sourceId, targetId, moveType) {
    // console.log(sourceId)
    // console.log(targetId)
    // console.log(moveType)
    var sourceCol = columnNum(sourceId[0]);
    var sourceRow = sourceId[1] - 1;

    var targetCol = columnNum(targetId[0]);
    var targetRow = targetId[1] - 1;

    // console.log(sourceCol + " : " + sourceRow)

    var squares = this.state.squares.map(c => c.slice());

    // console.log(squares[sourceCol])

    var sourcePiece = squares[sourceCol][sourceRow];
    var targetPiece = squares[targetCol][targetRow];

    if (targetPiece && sourcePiece.color === targetPiece.color) {
      // console.log("Can't take own piece")
      return;
    }

    squares[sourceCol][sourceRow] = null;
    squares[targetCol][targetRow] = sourcePiece;

    // var moveArray = [targetCol, targetRow];
    // var moveCoords = toChessCoord(moveArray);

    if (moveType === "enpassant") {
      var enpassantPos = toCoordArray(this.state.enpassant);
      squares[enpassantPos[0]][enpassantPos[1]] = null;
    } else if (moveType === "castle queenside") {
      squares[3][targetRow] = squares[0][targetRow];
      squares[0][targetRow] = null;
    } else if (moveType === "castle kingside") {
      squares[5][targetRow] = squares[7][targetRow];
      squares[7][targetRow] = null;
    }

    var enpassant = null;
    var castling = JSON.parse(JSON.stringify(this.state.castling)); //copyMap(this.state.castling);

    if (sourcePiece.name === "pawn") {
      if (moveType === "march") {
        // console.log("Enpassant candidate: " + targetId)
        enpassant = targetId;
      } else if (moveType === "queen") {
        squares[targetCol][targetRow] = new Queen({
          color: sourcePiece.color,
          id: "id",
          board: this
        });
      }
    } else if (castling[sourcePiece.color].includes(1)) {
      if (sourcePiece.name === "king") {
        // console.log("King moved, lost castling rights!")
        castling[sourcePiece.color] = [0, 0];
      } else if (
        sourcePiece.name === "rook" &&
        castling[sourcePiece.color][sourcePiece.num] === 1
      ) {
        // console.log("Rook moved, lost castling rights!")
        castling[sourcePiece.color][sourcePiece.num] = 0;
      }
    }

    var kingpos = JSON.parse(JSON.stringify(this.state.kingpos)); //copyMap(this.state.kingpos);
    if (sourcePiece.name === "king") {
      kingpos[sourcePiece.color] = targetId;
      // console.log(kingpos);
    }

    if (
      targetPiece &&
      targetPiece.name === "rook" &&
      castling[targetPiece.color].includes(1)
    ) {
      // console.log("Rook taken, castling rights lost! ")
      castling[targetPiece.color][targetPiece.num] = 0;
    }

    var turn = (this.state.turn + 1) % players.length;

    return {
      squares: squares,
      moves: [],
      enpassant: enpassant,
      castling: castling,
      kingpos: kingpos,
      turn: turn
    };
  }

  renderSquare(i, column, row, content, onDropHandler, color, turnPlayer) {
    return (
      <Square
        index={i}
        color={color}
        piece={content}
        column={column}
        row={row}
        onDropHandler={onDropHandler}
        turnPlayer={turnPlayer}
      />
    );
  }

  renderCoordinate(i, alignment) {
    return <Coordinate label={i} alignment={alignment} />;
  }

  render() {
    console.log("rendering");
    var rows = [];
    var index = 0;

    var kingpos = this.state.kingpos[this.inTurn()];

    var black = true;
    for (let i = this.state.squares.length - 1; i >= 0; i--) {
      var columns = [];
      black = !black;
      for (let j = 0; j < this.state.squares[i].length; j++) {
        var content = this.state.squares[j][i];
        let color = black ? "black" : "white";

        var chessCoord = toChessCoord([j, i]);
        if (kingpos === chessCoord) {
          if (this.state.status === "check") color = "orange";
          else if (this.state.status === "checkmate") color = "red";
          else if (this.state.status === "stalemate") color = "blue";
        }

        if (chessCoord in this.state.moves) {
          color = "green";
        }

        columns.push(
          this.renderSquare(
            index,
            j,
            i,
            content,
            ev => {
              dropOnSquare(ev, this);
            },
            color,
            this.inTurn()
          )
        );
        index++;
        black = !black;
      }
      columns.push(this.renderCoordinate(i + 1, "vertical"));
      rows.push(
        <div className="board-row" key={i}>
          {columns}
        </div>
      );
    }

    var coords = [];
    for (let i = 0; i < this.state.squares[0].length; i++) {
      coords.push(
        this.renderCoordinate(columnLetter(i).toUpperCase(), "horizontal")
      );
    }
    rows.push(<div className="board-row">{coords}</div>);

    var status = this.inTurn().capitalize() + " to play";
    var queen_query = null;
    if (this.state.status) {
      if (this.state.status === "checkmate") {
        status = "Checkmate! " + this.opponent().capitalize() + " wins!";
      } else if (this.state.status === "stalemate") {
        status = "Stalemate!";
      } else if (this.state.status === "queen_query") {
        queen_query = QueenQuery({ color: this.inTurn() });
        console.log(queen_query);
      }
    }
    // queen_query = QueenQuery({color: this.inTurn()});

    return (
      <div className="board-area">
        {queen_query}
        {<div>{rows}</div>}
        <div className="game-status">{status}</div>
      </div>
    );
  }

  initialState() {
    var squares = new Array(8);
    for (var i = 0; i < squares.length; i++) {
      squares[i] = new Array(8);
    }
    var addPawns = (row, color) => {
      for (var i = 0; i < squares.length; i++) {
        squares[i][row] = new Pawn({
          color: color,
          id: i,
          board: this
        });
      }
    };

    addPawns(1, "white");
    addPawns(6, "black");

    var addMirrored = (row, color) => {
      var piece = (C, id) =>
        new C({
          color: color,
          id: id,
          board: this
        });

      squares[0][row] = piece(Rook, 0);
      squares[7][row] = piece(Rook, 1);

      squares[1][row] = piece(Knight, 0);
      squares[6][row] = piece(Knight, 1);

      squares[2][row] = piece(Bishop, 0);
      squares[5][row] = piece(Bishop, 1);

      squares[3][row] = piece(Queen, 0);
      squares[4][row] = piece(King, 0);
    };

    addMirrored(0, "white");
    addMirrored(7, "black");

    return squares;
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          {/* <div>{status}</div>
          <ol>{moves}</ol> */}
        </div>
      </div>
    );
  }
}
