import Move from './move'

export default class Enpassant extends Move {
  constructor(target, source, piece, enpassant) {
    super(target, source, piece)
    this.enpassant = enpassant
  }

  execute(state) {
    const moved = super.execute(state)
    moved.take(this.enpassant.take)
    return moved
  }
}
