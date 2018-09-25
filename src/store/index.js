import { createStore, combineReducers } from 'redux'
import moves from './moves'
import history from './history'

const reducer = combineReducers({
  moves,
  history
})

export default createStore(reducer)