import State from '../game/state'
import { last } from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
  case 'INIT_GAME':
    return {
      history: [new State()],
      selected: null
    }
  case 'END_MOVE':
    // is move possible ?
    return action.data
      ? // execute legal move
      {
        history: [...state.history, action.data.execute(last(state.history))],
        selected: null // reset selection
      }
      : // otherwise return previous state
      state
  case 'SELECT_STATE':
    return action.data === last(state.history) ? { ...state, selected: null } : { ...state, selected: action.data }
  default:
    return state
  }
}

export const selectState = state => ({
  type: 'SELECT_STATE',
  data: state
})
