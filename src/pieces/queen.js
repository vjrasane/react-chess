import white from '../images/queen_white.png'
import black from '../images/queen_black.png'

export default class Queen {
  static letter = 'Q'
  static type = 'queen'
  constructor(color) {
    this.color = color
    this.image = { white, black }[color]
  }

}
