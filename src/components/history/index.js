import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Forward from '@material-ui/icons/ChevronRight'
import Last from '@material-ui/icons/LastPage'
import Backward from '@material-ui/icons/ChevronLeft'
import First from '@material-ui/icons/FirstPage'

import './index.css'

const button = Icon => (
  <Button
    variant="outlined"
    className="history-button">
    <Icon />
  </Button>
)

const History = ({ moves }) => (
  <div className="history-container">
    <div className="history-moves-container">
      <table className="history-table">
        <tbody>
          <tr className="header-row">
            <th>#</th>
            <th>White</th>
            <th>Black</th>
          </tr>
          {moves.map(m => (
            <tr
              key={ m.num }
              className="table-row">
              <td className="num-cell">{m.num}</td>
              <td className="move-cell white-move">{m.white.target.notation()}</td>
              <td className="move-cell">{m.black ? m.black.target.notation() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="history-buttons-container">
      {button(First)}
      {button(Backward)}
      {button(Forward)}
      {button(Last)}
    </div>
  </div>
)

const getMoves = history => {
  const movedStates = history.slice(1).map(h => h.move)
  const moves = movedStates.reduce((acc, curr, index) => {
    if (!acc.length || last(acc).black) {
      return [...acc, { index, num: Math.round(index / 2), white: curr }]
    }
    last(acc).black = curr
    return acc
  }, [])
  return moves
}

const mapStateToProps = ({ history }) => ({
  moves: getMoves(history)
})

const CONNECTED = connect(mapStateToProps)(History)

export default CONNECTED
