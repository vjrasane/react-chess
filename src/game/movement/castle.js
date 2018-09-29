import coord, { cardinals } from '../coordinates'
import Move from './move'

export default class Castle extends Move {
  constructor(target, source, piece, side) {
    super(target, source, piece)
    this.side = side
  }

  execute(state) {
    const moved = super.execute(state)

    const castle = (rookStart, rookEnd) => {
      moved.put(moved.at(rookStart), rookEnd)
      moved.take(rookStart)
    }
    const kings = () => castle(coord(7, this.piece.startRow), this.target.to(cardinals.left))
    const queens = () => castle(coord(0, this.piece.startRow), this.target.to(cardinals.right))

    // without this the interpreter doesn't realize its an object
    true && { kings, queens }[this.side]() 
    return moved
  }
}
