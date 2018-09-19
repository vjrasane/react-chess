
import { notation } from '../utils'

class Coordinates {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.coordinates = notation(this.x, this.y)
  }
}

export default Coordinates;