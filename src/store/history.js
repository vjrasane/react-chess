import State from '../state'
import { last } from 'lodash'

export default (state = [], action) => {
  switch (action.type) {
  case 'INIT_GAME':
    return [new State()]
  case 'END_MOVE':
    // was move legal ?
    return action.legal 
      // execute legal move
      ? [...state, last(state).move(action.source, action.target)]
      // otherwise return previous state
      : state
  default:
    return state
  }
}
