const players = ['white', 'black']

export default (state = null, action) => {
  switch (action.type) {
  case 'INIT_GAME':
    return 'white'
  case 'END_MOVE':
    return action.data // is move possible?
      ? players[(players.indexOf(state) + 1) % players.length] // change player in turn
      : state // otherwise return same player
  default:
    return state
  }
}
