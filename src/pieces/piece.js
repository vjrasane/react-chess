class Piece {
  constructor(color, images, startRows) {
    this.color = color
    this.image = images[color]
    this.startRow = (startRows || { white: 0, black: 7 })[this.color]
  }

  moves = () => [] // dummy implementation to prevent errors
}

Piece.prototype.toString = () => Piece.letter

export default Piece
