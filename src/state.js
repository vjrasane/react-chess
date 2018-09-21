import { times } from 'lodash'
import { forLetter, pawn } from './pieces'
import coord from './coordinates'

const officers = (color, row) =>
  'RNBQKBNR'.split('').map((l, i) => ({
    object: forLetter(l)[color],
    position: coord(i, row)
  }))

const pawns = color =>
  times(8, c => ({
    object: pawn[color],
    position: coord(c, pawn[color].startRow)
  }))

const init = {
  turn: 'white',
  castling: {
    white: ['kings', 'queens'],
    black: ['kings', 'queens']
  },
  pieces: [
    ...officers('white', 0),
    ...officers('black', 7),
    ...pawns('white'),
    ...pawns('black')
  ]
}

class State {
  constructor(state) {
    const { castling, turn, pieces } = state || {}
    this.castling = castling || init.castling
    this.turn = turn || init.turn
    this.pieces = pieces || init.pieces
  }
}

export default State
