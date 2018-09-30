import React from 'react'
import Board from '../board'
import Preload from '../preload'
import History from '../history'

import check from '../../images/indicators/orange_glow.png'
import checkmate from '../../images/indicators/red_glow.png'
import stalemate from '../../images/indicators/blue_glow.png'
import move from '../../images/indicators/green_dot.png'

import './index.css'

class Game extends React.Component {
  render = () => (
    <div className="game-container">
      <Board />
      <History />
      <Preload images={ [check, checkmate, stalemate, move] } />
    </div>
  )
}

export default Game
