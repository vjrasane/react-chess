import { notation } from '../utils'

class Coordinates {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  notation = () => notation(this.x, this.y)
  opposite = () => this.times(-1)
  times = scalar => new Coordinates(this.x * scalar, this.y * scalar)
  to = direction => new Coordinates(this.x + direction.x, this.y + direction.y)
  equals = other => this.x === other.x && this.y === other.y
}

const coord = (x, y) => new Coordinates(x, y)

export const cardinals = {
  up: coord(0, 1),
  down: coord(0, -1),
  left: coord(-1, 0),
  right: coord(1, 0)
}

export const diagonals = {
  left_up: coord(-1, 1),
  left_down: coord(-1, -1),
  right_up: coord(1, 1),
  right_down: coord(1, -1)
}

export default (x, y) => new Coordinates(x, y)
