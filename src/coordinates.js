import { notation } from './utils'
import { Direction } from './directions'
class Coordinates extends Direction {
  constructor(x, y) {
    super(x, y)
    this.notation = notation(this.x, this.y)
  }
}

export default (x, y) => new Coordinates(x, y)
