import { createStore, combineReducers } from 'redux'
import moves from './moves'
import turn from './turn'
import history from './history'

const reducer = combineReducers({
  moves,
  turn,
  history
})

export default createStore(reducer)