import Move from './move'

export default class Queening extends Move {
  constructor(target, source, piece) {
    super(target, source, piece)
  }

  execute(state) {
    const moved = super.execute(state)
    console.log('QUEENING')
    return moved
  }
}
