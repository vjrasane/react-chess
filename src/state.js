import { times, clone } from 'lodash'
import { forLetter, pawn } from './pieces'

const officers = color => 'RNBQKBNR'.split('').map(l => forLetter(l)[color])
const empty = () => times(8, () => {})
const pawns = color => times(8, () => pawn[color])

const init = {
  turn: 'white',
  castling: {
    white: ['kings', 'queens'],
    black: ['kings', 'queens']
  },
  board: [officers('white'), pawns('white'), ...times(4, () => empty()), pawns('black'), officers('black')]
}

class State {
  constructor(state) {
    const { castling, turn, board } = state || init
    this.castling = clone(castling)
    this.turn = turn
    this.board = clone(board)
  }

  at = pos => inBounds(pos) && this.board[pos.y][pos.x]
  
  put = (piece, pos) => inBounds(pos) && (this.board[pos.y][pos.x] = piece)
  take = (pos) => this.put(undefined, pos)

  move = (source, target) => {
    const moved = new State(this)
    moved.put(moved.at(source), target)
    moved.take(source)
    return moved
  }
}

export const inBounds = pos =>
  pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8

export default State
