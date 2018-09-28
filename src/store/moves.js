export default (state = [], action) => {
  switch (action.type) {
  case 'BEGIN_MOVE':
    return [...action.data]
  case 'END_MOVE':
    return []
  default:
    return state
  }
}

export const beginMove = moves => ({
  type: 'BEGIN_MOVE',
  data: moves
})

export const endMove = move => ({
  type: 'END_MOVE',
  data: move
})
