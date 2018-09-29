import Move from './move'

export default class March extends Move {
  constructor(target, source, piece, behind) {
    super(target, source, piece)
    this.behind = behind
  }

  execute(state) {
    const moved = super.execute(state)
    moved.enpassant = {
      take: this.target,
      target: this.behind
    }
    return moved
  }
}
