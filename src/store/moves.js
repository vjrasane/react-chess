export default (state = {}, action) => {
  switch (action.type) {
  case 'BEGIN_MOVE':
    return {
      source: action.source,
      legal: action.legal
    }
  case 'END_MOVE':
    return {} // clear move in progress
  default:
    return state
  }
}

export const beginMove = (piece, source, state) => ({
  type: 'BEGIN_MOVE',
  source,
  legal: piece.moves(source, state)
})

export const endMove = ({ source, legal }, target) => ({
  type: 'END_MOVE',
  source,
  target,
  legal
})
