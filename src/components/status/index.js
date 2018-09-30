import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'

import white from '../../images/pieces/white/king.png'
import black from '../../images/pieces/black/king.png'

import './index.css'

const Status = ({ selected }) => (
  <div className="status-indicator-container">
    <div className="status-indicator-image-block">
      <img
        className="status-indicator-image"
        src={{ white, black }[selected.turn]} />
    </div>
  </div>
)

const mapStateToProps = () => ({ states }) => ({
  selected: states.selected || last(states.history)
})

const CONNECTED = connect(mapStateToProps)(Status)

export default CONNECTED
