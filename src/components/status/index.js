import React from 'react'
import { last, capitalize } from 'lodash'
import { connect } from 'react-redux'

import white from '../../images/pieces/white/king.png'
import black from '../../images/pieces/black/king.png'

import './index.css'

const message = state => (state.status && state.status !== 'check' ? 'Game over' : `${capitalize(state.turn)} to play`)
const details = (state, history) => {
  switch (state.status) {
  case 'checkmate':
    return `${capitalize(state.next())} wins by checkmate`
  case 'stalemate':
    return 'Stalemate!'
  case 'flagged':
    return `${capitalize(state.next())} wins on time`
  default:
    return history && 'Viewing history'
  }
}

const Message = ({ state, history }) => {
  const detailsMsg = details(state, history)
  return (
    <div className="status-message-block">
      <div className={ `status-message ${history ? 'history-status' : 'current-status'}` }>{message(state)}</div>
      {detailsMsg && <div className={ `status-details ${history ? 'history-status' : 'current-status'}` }>{detailsMsg}</div>}
    </div>
  )
}

const Status = ({ selected, history }) => (
  <div className="status-container">
    <div className="status-image-block">
      <img
        className={ `status-image ${history ? ' history-image' : 'current-image'}` }
        src={{ white, black }[selected.turn]} />
    </div>
    <Message
      state={ selected }
      history={ history } />
  </div>
)

const mapStateToProps = ({ states }) => ({
  selected: states.selected || last(states.history),
  result: states.result, // forces an update even when the selected state remains the same
  history: !!states.selected
})

const CONNECTED = connect(mapStateToProps)(Status)

export default CONNECTED
