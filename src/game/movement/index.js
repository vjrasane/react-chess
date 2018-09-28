import { diagonals, cardinals } from '../coordinates'
import { inBounds } from '../state'
import Move from './move'
import Castle from './move'

const toDirection = (pos, dir, state) => {
  const moves = []
  let current = pos.to(dir)
  while (inBounds(current)) {
    const piece = state.at(current)
    if (piece) {
      if (piece.color !== state.at(pos).color) {
        moves.push(new Move(current, pos, state.at(pos)))
      }
      break
    } else {
      moves.push(new Move(current, pos, state.at(pos)))
    }
    current = current.to(dir)
  }
  return moves
}

const directionMoves = (pos, state, directions) => Object.values(directions).reduce((acc, curr) => [...acc, ...toDirection(pos, curr, state)], [])

export const diagonalMoves = (pos, state) => directionMoves(pos, state, diagonals)
export const cardinalMoves = (pos, state) => directionMoves(pos, state, cardinals)

export { Move, Castle }
