const time = 5 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds */

export default (state = [], action) => {
  switch (action.type) {
  case 'INIT_GAME':
    return { start: Date.now(), times: { white: time, black: time } }
  default:
    return state
  }
}
