
class Piece {
  constructor(color, images) {
    this.color = color
    this.image = images[color]
  }

  moves = () => [] // dummy implementation to prevent errors
}

Piece.prototype.toString = () => Piece.letter

export default Piece