import { createStore, combineReducers } from 'redux'
import moves from './moves'
import states from './states'

const reducer = combineReducers({
  moves,
  states
})

export default createStore(reducer)