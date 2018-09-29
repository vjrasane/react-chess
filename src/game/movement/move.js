import coord from '../coordinates'
import State from '../state'

export default class Move {
  constructor(target, source, piece) {
    this.source = source
    this.target = target
    this.piece = piece
  }

  ruin = state => {
    if (this.piece.type === 'King') {
      return []
    } else if (this.piece.type === 'Rook') {
      const kings = () => !this.source.equals(coord(7, this.startRow))
      const queens = () => !this.source.equals(coord(0, this.startRow))

      return state.castling[this.piece.color].filter(side => ({ kings, queens }[side]()))
    }
    return state.castling[this.piece.color]
  }

  execute(state) {
    const moved = new State(state)
    moved.put(moved.at(this.source), this.target)
    moved.take(this.source)
    // ruin castling ?
    moved.castling[this.piece.color] = this.ruin(state)
    // clear enpassant
    delete moved.enpassant 
    return moved
  }
}
