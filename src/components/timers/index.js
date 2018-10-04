import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'
import moment from 'moment'

import { outOfTime } from '../../store/states'
import './index.css'

const prettyTime = millis => moment.utc(millis).format('mm:ss')

class Timer extends React.Component {
  static initial = 5 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds */
  state = {
    remaining: Timer.initial
  }

  timer = Date.now()

  elapsed = () => {
    const now = Date.now()
    const millis = now - this.timer
    this.timer = now
    return millis
  }

  tick = () => this.state.remaining > 0 && !this.props.over && this.props.turn && this.setState({ remaining: this.state.remaining - this.elapsed() })

  componentDidMount = () => (this.interval = setInterval(this.tick, 10))
  componentWillUnmount = () => clearInterval(this.interval)

  componentDidUpdate = prev => {
    // turn changed ?
    if (!prev.turn && this.props.turn) {
      // reset timer
      this.timer = Date.now()
    }

    if (this.state.remaining <= 0) {
      this.props.over || this.props.outOfTime()
      if (this.state.remaining < 0) this.setState({ remaining: 0 })
    }
  }

  render = () => <div className="timer">{prettyTime(this.state.remaining)}</div>
}

const Timers = ({ turn, over, outOfTime }) => (
  <div className="timer-container">
    <Timer
      turn={ turn === 'white' }
      over={ over }
      outOfTime={ outOfTime } />
    <Timer
      turn={ turn === 'black' }
      over={ over }
      outOfTime={ outOfTime } />
  </div>
)

const CONNECTED = connect(
  ({ states }) => ({
    turn: last(states.history).turn,
    over: !!states.result
  }),
  { outOfTime }
)(Timers)

export default CONNECTED
