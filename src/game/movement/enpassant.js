import coord, { cardinals } from '../coordinates'
import State from '../state'
import Move from './move'

export default class Enpassant extends Move {
  constructor(target, source, piece, enpassant) {
    super(target, source, piece)
    this.enpassant = enpassant
  }

  execute = state => {
    // TODO
  }
}
