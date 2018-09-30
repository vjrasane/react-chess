import React from 'react'
import { last } from 'lodash'
import { connect } from 'react-redux'

import { selectState } from '../../store/states'

import './index.css'

const History = ({ moves, selected, selectState }) => {
  const MoveCell = ({ state }) => (
    <td
      className={ 'move-cell' + (state === selected ? ' selected-state' : '') }
      onClick={ () => selectState(state) }>
      {state.move.target.notation()}
    </td>
  )

  const MoveRow = ({ moves }) => (
    <tr className="table-row">
      <td className="num-cell">{moves.num}</td>
      <MoveCell state={ moves.white } />
      {moves.black && <MoveCell state={ moves.black } />}
    </tr>
  )

  return (
    <div className="history-moves-container">
      <table className="history-table">
        <tbody>
          <tr className="header-row">
            <th>#</th>
            <th>White</th>
            <th>Black</th>
          </tr>
          {moves.map(m => (
            <MoveRow
              key={ m.num }
              moves={ m } />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ states }) => ({
  moves: states.history
    .slice(1) // ignore the first state as it does not have a move
    .reduce(
      (/* an array of move row objects */ acc, /* current state */ curr, /* state index */ index) =>
        // white moves are always on even indices
        index % 2 === 0
          ? // create a new move row object
          [...acc, { num: Math.round(index / 2), white: curr }]
          : // edit the last move row object
          [...acc.slice(0, -1), { ...last(acc), black: curr }],
      []
    ),
  selected: states.selected || last(states.history)
})

const actionCreators = { selectState }

const CONNECTED = connect(
  mapStateToProps,
  actionCreators
)(History)

export default CONNECTED
