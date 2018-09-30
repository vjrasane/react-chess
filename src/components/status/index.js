import React from 'react'
import { last, capitalize } from 'lodash'
import { connect } from 'react-redux'

import white from '../../images/pieces/white/king.png'
import black from '../../images/pieces/black/king.png'

import './index.css'

const Status = ({ selected, history }) => (
  <div className="status-container">
    <div className="status-image-block">
      <img
        className={ 'status-image ' + (history ? ' history-image' : 'current-image') }
        src={{ white, black }[selected.turn]} />
    </div>
    <div className="status-message-block">
      <div className={ 'status-message ' + (history ? 'history-status' : 'current-status') }>{capitalize(selected.turn) + ' to play'}</div>
      {history && <div className="status-details">Viewing history</div>}
    </div>
  </div>
)

const mapStateToProps = ({ states }) => ({
  selected: states.selected || last(states.history),
  history: !!states.selected
})

const CONNECTED = connect(mapStateToProps)(Status)

export default CONNECTED
