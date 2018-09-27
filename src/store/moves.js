export default (state = {}, action) => {
  switch (action.type) {
  case 'BEGIN_MOVE':
    return { ...action.data }
  case 'END_MOVE':
    return {} // clear move in progress
  default:
    return state
  }
}

export const beginMove = (piece, source, state) => ({
  type: 'BEGIN_MOVE',
  data: {
    source,
    piece,
    legal: piece.moves(source, state)
  }
})

export const endMove = (move, target) => ({
  type: 'END_MOVE',
  data: {
    ...move,
    target
  }
})
