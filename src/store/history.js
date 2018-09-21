import State from '../state'

export default (state = [], action) => {
  switch (action.type) {
  case 'INIT_GAME': 
    return [new State()]
  default:
    return state
  }
}
