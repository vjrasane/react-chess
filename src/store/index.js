import { createStore, combineReducers } from 'redux'
import moves from './moves'
import queening from './queening'
import states from './states'

const reducer = combineReducers({
  moves,
  queening,
  states
})

export default createStore(reducer)