import { first, times, cloneDeep } from 'lodash'
import coord from './coordinates'
import { pieces, Pawn } from './pieces'

export const forLetter = (letter, color) => {
  const Class = pieces.find(P => P.letter === letter)
  return new Class(color)
}

const officers = color => 'RNBQKBNR'.split('').map(l => forLetter(l, color))
const empty = () => times(8, () => {})
const pawns = color => times(8, () => new Pawn(color))

const players = ['white', 'black']

const init = {
  turn: first(players),
  castling: {
    white: ['kings', 'queens'],
    black: ['kings', 'queens']
  },
  kings: {
    white: coord(4, 0),
    black: coord(4, 7)
  },
  board: [officers('white'), pawns('white'), ...times(4, () => empty()), pawns('black'), officers('black')]
}

class State {
  constructor(state) {
    const { castling, turn, board, kings } = state || init
    this.castling = cloneDeep(castling)
    this.kings = cloneDeep(kings)
    this.turn = turn
    this.board = cloneDeep(board)
  }

  at = pos => inBounds(pos) && this.board[pos.y][pos.x]
  put = (piece, pos) => inBounds(pos) && (this.board[pos.y][pos.x] = piece)
  take = pos => this.put(undefined, pos)

  next = () => players[(players.indexOf(this.turn) + 1) % players.length]

  check = (color, pos) =>
    // is there a row...
    this.board.some((row, y) =>
      // that contains a piece...
      row.some(
        (piece, x) =>
          piece &&
          // thats not the same color
          piece.color !== color &&
          // and has a move that targets the given position
          piece.takes(coord(x, y), this).some(m => m.target.equals(pos || this.kings[color]))
      )
    )

  legal = () =>
    // is there a row...
    this.board.some((row, y) =>
      // that contains a piece...
      row.some(
        (piece, x) =>
          piece &&
          // that belongs to player in turn
          piece.color === this.turn &&
          // and has a legal move
          piece.moves(coord(x, y), this).length
      )
    )

  execute = move => {
    const moved = new State(this)
    moved.put(moved.at(move.source), move.target)
    moved.take(move.source)
    moved.turn = this.next()

    moved.move = move
    return moved
  }

  notation = () => this.move.notation() + (this.status ? { flagged: '', check: '+', checkmate: '#' }[this.status] : '')
}

export const inBounds = pos => pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8

export default State
