import white from '../images/knight_white.png'
import black from '../images/knight_black.png'

const knight_moves = [
  [-2, 1],
  [-2, -1],
  [2, 1],
  [2, -1],
  [-1, 2],
  [1, 2],
  [-1, -2],
  [1, -2]
]

export default class Knight {
  static letter = 'N'
  static type = 'knight'

  constructor(color) {
    this.color = color
    this.image = { white, black }[color]
  }

}
