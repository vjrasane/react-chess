import React from 'react'
import { connect } from 'react-redux'
import { last } from 'lodash'
import Square from './square'
import coord from '../game/coordinates'

const Row = ({ squares, rowNum, state }) => (
  <div className="board-row">
    {squares.map((piece, colNum) => {
      const pos = coord(colNum, rowNum)
      return (
        <Square
          piece={ piece }
          state={ state }
          position={ pos }
          key={ pos.notation() } />
      )
    })}
  </div>
)

const Board = ({ state }) => (
  <div className="board-area">
    {[...state.board].reverse().map((squares, revRow) => {
      const rowNum = 7 - revRow
      return (
        <Row
          key={ 'row' + rowNum }
          squares={ squares }
          rowNum={ rowNum }
          state={ state } />
      )
    })}
  </div>
)

const mapStateToProps = (/* store */ { history }) => ({
  state: last(history),
})

const CONNECTED = connect(mapStateToProps)(Board)

export { Board as RawComponent }
export default CONNECTED
