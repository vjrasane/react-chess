import { notation } from './utils'

class Coordinates {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.notation = notation(this.x, this.y)
  }

  equals = other => this.x === other.x && this.y === other.y
}

export default (x, y) => new Coordinates(x, y)
