import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Board from './game/board'
import store from './store'
import './index.css'

const render = component => ReactDOM.render(component, document.getElementById('root'))

store.dispatch({ type: 'INIT_GAME' })

const component = (
  <Provider store={ store }>
    <Board />
  </Provider>
)

render(component)
