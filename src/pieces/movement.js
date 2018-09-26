import { diagonals, cardinals } from '../coordinates'
import { inBounds } from '../state'

const toDirection = (pos, dir, state) => {
  const moves = []
  let current = pos.to(dir)
  while (inBounds(current)) {
    const piece = state.at(current)
    if(piece) {
      if(piece.color !== state.at(pos).color) {
        moves.push(current)
      }
      break
    } else {
      moves.push(current)
    }
    current = current.to(dir)
  }
  return moves
}

const directionMoves = (pos, state, directions) =>
  Object.values(directions).reduce(
    (acc, curr) => [...acc, ...toDirection(pos, curr, state)],
    []
  )

export const diagonalMoves = (pos, state) =>
  directionMoves(pos, state, diagonals)
export const cardinalMoves = (pos, state) =>
  directionMoves(pos, state, cardinals)
