import Pawn from './pawn'
import Rook from './rook'
import King from './king'
import Queen from './queen'
import Bishop from './bishop'
import Knight from './knight'

export { Pawn, Rook, King, Queen, Bishop, Knight }

export const forLetter = (letter, color) => {
  const Class = [Pawn, Rook, King, Queen, Bishop, Knight].find(P => P.letter === letter)
  return new Class(color)
}
