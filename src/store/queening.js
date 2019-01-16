export default (state = null, action) => {
  switch (action.type) {
  case 'BEGIN_QEENING':
    return { move: action.move }
  case 'END_QUEENING':
    return null
  default:
    return state
  }
}

export const beginQueening = move => ({
  type: 'BEGIN_QEENING',
  move
})

export const endQueening = () => ({
  type: 'END_QUEENING'
})

