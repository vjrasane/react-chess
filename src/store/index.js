import { createStore, combineReducers } from 'redux'
import history from './history'

const reducer = combineReducers({
  history
})

export default createStore(reducer)