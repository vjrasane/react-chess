import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'

import moment from 'moment'

import './index.css'

class Timer extends React.Component {
  state = {
    elapsed: 0
  }

  tick = () => this.props.turn && this.setState({ elapsed: Date.now() - this.props.start })

  componentDidMount = () => (this.timer = setInterval(this.tick, 10))
  componentWillUnmount = () => clearInterval(this.timer)

  render = () => {
    const formatted = moment.utc(this.props.time - this.state.elapsed).format('mm:ss')

    return <div className="timer">{formatted}</div>
  }
}

const Timers = ({ start, times, turn }) => (
  <div className="timer-container">
    <Timer
      turn={ turn === 'white' }
      start={ start }
      time={ times.white } />
    <Timer
      turn={ turn === 'black' }
      start={ start }
      time={ times.black } />
  </div>
)

const mapStateToProps = ({ timers, states }) => ({
  turn: last(states.history).turn,
  start: timers.start,
  times: timers.times
})

const CONNECTED = connect(mapStateToProps)(Timers)

export default CONNECTED
