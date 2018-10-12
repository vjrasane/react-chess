import React from 'react'
import { first, last } from 'lodash'
import { connect } from 'react-redux'

import forward from '../../images/buttons/forward.png'
import backward from '../../images/buttons/backward.png'
import backwardDouble from '../../images/buttons/backward_double.png'
import forwardDouble from '../../images/buttons/forward_double.png'

import { selectState } from '../../store/states'

import './index.css'

const Controls = ({ history, selected, selectState }) => {
  const next = () => history[Math.min(history.indexOf(selected) + 1, history.length - 1)]
  const prev = () => history[Math.max(history.indexOf(selected) - 1, 0)]
  const button = (image, click) => (
    <div
      className="control-button"
      onClick={ () => selectState(click()) }>
      <img
        src={ image }
        className="control-button-icon" />
    </div>
  )
  return (
    <div className="control-buttons-container">
      {button(backwardDouble, () => first(history))}
      {button(backward, prev)}
      {button(forward, next)}
      {button(forwardDouble, () => last(history))}
    </div>
  )
}

const mapStateToProps = ({ states }) => ({
  history: states.history,
  selected: states.selected || last(states.history)
})

const actionCreators = { selectState }

const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(Controls)

export default CONNECTED
