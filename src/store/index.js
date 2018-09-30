import { createStore, combineReducers } from 'redux'
import moves from './moves'
import states from './states'
import timers from './timers'

const reducer = combineReducers({
  moves,
  states,
  timers
})

export default createStore(reducer)