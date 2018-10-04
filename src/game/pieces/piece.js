class Piece {
  constructor(Class, color, images, startRows) {
    this.color = color
    this.image = images[color]
    this.startRow = (startRows || { white: 0, black: 7 })[this.color]

    this.type = Class.type
    this.letter = Class.letter
  }

  takes = (pos, state) => this.unchecked(pos, state)

  unchecked = () => []

  moves = (pos, state) =>
    this.unchecked(pos, state).filter(m => {
      const moved = m.execute(state)
      return !moved.check(this.color)
    })
}

Piece.prototype.toString = () => Piece.letter

export default Piece
