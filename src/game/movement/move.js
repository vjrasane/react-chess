import coord from '../coordinates'

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
    const moved = state.move(this.source, this.target)
    // ruin castling ?
    moved.castling[this.piece.color] = this.ruin(state)

    if (this.piece.type === 'King') moved.kings[this.piece.color] = this.target

    // clear enpassant
    delete moved.enpassant
    return moved
  }

  equals = other => this.source.equals(other.source) && this.target.equals(other.target)
}
