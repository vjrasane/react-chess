import { times, clone } from 'lodash'
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
    const { castling, turn, pieces } = state || init
    this.castling = clone(castling)
    this.turn = turn
    this.pieces = clone(pieces)
  }

  at = (pos) => this.pieces.find(p => p.position.equals(pos))

  move = (source, target) => {
    const moved = new State(this)

    const sourcePiece = moved.at(source)
    const targetPiece = moved.at(target)

    sourcePiece.position = target
    targetPiece && moved.pieces.splice(moved.pieces.indexOf(targetPiece), 1)

    return moved
  }
}

export default State
