import React from 'react'
// import { coordinates } from '../utils'

import { times } from 'lodash'
import Square from './square'
import coord from '../coordinates'

const square = pos => <Square position={pos} key={pos.notation} />

const Board = () => (
  <div className="board-area">
    {times(8, y => (
      <div key={'row ' + y} className="board-row">
        {times(8, x => square(coord(x, 7 - y)))}
      </div>
    ))}
  </div>
)

export default Board
