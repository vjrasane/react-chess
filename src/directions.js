export class Direction {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  to = direction => new Direction(this.x + direction.x, this.y + direction.y)

  equals = other => this.x === other.x && this.y === other.y
}

const dir = (x, y) => new Direction(x, y)

export const cardinals = {
  up: dir(0, 1),
  down: dir(0, -1),
  left: dir(-1, 0),
  right: dir(1, 0)
}

export const diagonals = {
  left_up: dir(-1, 1),
  left_down: dir(-1, -1),
  right_up: dir(1, 1),
  right_down: dir(1, -1)
}

export default dir
