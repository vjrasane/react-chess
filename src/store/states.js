import State from '../game/state'
import { last } from 'lodash'

const status = status => {
  const legal = status.legal(status.turn)
  if (status.check(status.turn)) {
    return legal ? 'check' : 'checkmate'
  }
  return legal ? undefined : 'stalemate'
}

const execute = (move, state) => {
  const moved = move.execute(last(state.history))
  moved.status = status(moved)
  return {
    history: [...state.history, moved],
    selected: null,
    result: moved.status !== 'check' && moved.status
  }
}

const flagged = state => {
  const final = last(state.history)
  final.status = 'flagged'
  return {
    ...state,
    history: [...state.history.slice(0, -1), final],
    result: 'flagged'
  }
}

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
      execute(action.data, state)
      : // otherwise return previous state
      state
  case 'SELECT_STATE':
    return action.data === last(state.history) ? { ...state, selected: null } : { ...state, selected: action.data }
  case 'OUT_OF_TIME':
    return flagged(state)
  default:
    return state
  }
}

export const selectState = state => ({
  type: 'SELECT_STATE',
  data: state
})

export const outOfTime = () => ({
  type: 'OUT_OF_TIME'
})
