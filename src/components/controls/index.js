import React from 'react'
import { first, last } from 'lodash'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Forward from '@material-ui/icons/ChevronRight'
import Last from '@material-ui/icons/LastPage'
import Backward from '@material-ui/icons/ChevronLeft'
import First from '@material-ui/icons/FirstPage'

import { selectState } from '../../store/states'

import './index.css'

const Controls = ({ history, selected, selectState }) => {
  const next = () => history[Math.min(history.indexOf(selected) + 1, history.length - 1)]
  const prev = () => history[Math.max(history.indexOf(selected) - 1, 0)]
  const button = (Icon, click) => (
    <Button
      variant="outlined"
      className="control-button"
      onClick={ () => selectState(click()) }>
      <Icon />
    </Button>
  )
  return (
    <div className="control-buttons-container">
      {button(First, () => first(history))}
      {button(Backward, prev)}
      {button(Forward, next)}
      {button(Last, () => last(history))}
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
