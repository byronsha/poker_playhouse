import React from 'react'
import Players from './Players'
import Seats from './Seats'

class Game extends React.Component {
  render() {
    const { player, table, onLeaveClick, onSeatClick } = this.props

    return (
      <div>
        <h1>{table.name} | {table.limit} NL | {table.maxPlayers} players</h1>
        <button onClick={() => { onLeaveClick() }}>Leave table</button>
        
        <Players
          player={player}
          table={table}
        />

        <Seats
          table={table}
          onSeatClick={onSeatClick}
        />
      </div>
    )
  }
}

export default Game
