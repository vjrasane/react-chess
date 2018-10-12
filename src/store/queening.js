export default (state = null, action) => {
  switch (action.type) {
  case 'TOGGLE_MENU':
    return state ? null : { position: action.position }
  default:
    return state
  }
}

export const toggleMenu = (position) => ({
  type: 'TOGGLE_MENU',
  position
})
