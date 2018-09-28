import coord, { cardinals } from '../coordinates'
import State from '../state'
import Move from './move'

export default class Castle extends Move {
  constructor(target, source, piece, side) {
    super(target, source, piece)
    this.side = side
  }

  execute = state => {
    const moved = new State(state)

    const kings = () => moved.put(moved.at(coord(7, this.piece.startRow), this.target.to(cardinals.left)))
    const queens = () => moved.put(moved.at(coord(0, this.piece.startRow), this.target.to(cardinals.right)))

    {
      kings, queens
    }
    [this.side]()

    moved.put(moved.at(this.source), this.target)
    moved.take(this.source)

    // ruin castling
    moved.castling[this.piece.color] = []
    return moved
  }
}
