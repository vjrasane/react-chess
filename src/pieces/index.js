import Pawn from './pawn'
import Rook from './rook'
import King from './king'
import Queen from './queen'
import Bishop from './bishop'
import Knight from './knight'

const colored = Piece => ({
  letter: Piece.letter,
  type: Piece.type,
  white: new Piece('white'),
  black: new Piece('black')
})

export const pawn = colored(Pawn)
export const rook = colored(Rook)
export const king = colored(King)
export const queen = colored(Queen)
export const bishop = colored(Bishop)
export const knight = colored(Knight)

export const forLetter = letter =>
  [pawn, rook, king, queen, bishop, knight].find(p => p.letter === letter)
