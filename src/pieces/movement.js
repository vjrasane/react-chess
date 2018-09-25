import { diagonals, cardinals } from '../directions'

export const inBounds = pos =>
  pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8

const toDirection = (pos, dir, state) => {
  const moves = []
  let current = pos.to(dir)
  while (inBounds(current)) {
    const piece = state.at(current)
    if (!piece || piece.color !== state.at(pos).color) {
      moves.push(current)
    }
    current = current.to(dir)
  }
  return moves
}

const directionMoves = (pos, state, directions) =>
  Object.values(directions).reduce(
    (acc, curr) => [...acc, toDirection(pos, curr, state)],
    []
  )

export const diagonalMoves = (pos, state) =>
  directionMoves(pos, state, diagonals)
export const cardinalMoves = (pos, state) =>
  directionMoves(pos, state, cardinals)
