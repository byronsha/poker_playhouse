import React from 'react'
import Players from './Players'
import Seats from './Seats'
import Board from './Board'
import Pot from './Pot'
import ActionButtons from './ActionButtons'

class Game extends React.Component {
  isOwnTurn() {
    const { player, table } = this.props

    for (let i = 1; i <= Object.keys(table.seats).length; i++) {
      if (table.seats[i] && table.seats[i].turn && table.seats[i].player.socketId === player.socketId) {
        return true
      }
    }

    return false
  }

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
          player={player}
          table={table}
          onSeatClick={onSeatClick}
        />

        <Board table={table} />
        <Pot table={table} />

        {this.isOwnTurn() &&
          <ActionButtons player={player} table={table} />
        }
      </div>
    )
  }
}

export default Game
