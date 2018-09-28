import State from '../game/state'
import { last } from 'lodash'

export default (state = [], action) => {
  switch (action.type) {
  case 'INIT_GAME':
    return [new State()]
  case 'END_MOVE':
    // is move possible ?
    return action.data
      ? // execute legal move
      [...state, action.data.execute(last(state))]
      : // otherwise return previous state
      state
  default:
    return state
  }
}
