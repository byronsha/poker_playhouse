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
    const { player, table, onLeaveClick, onSeatClick, onRaiseClick,
            onCheckClick, onCallClick, onFoldClick } = this.props

    console.log(table)

    return (
      <div id="game">
        <h1>
          {table.name} | {table.limit} NL | {table.maxPlayers} players
          <button onClick={() => { onLeaveClick() }}>Leave table</button>
        </h1>
        
        <hr />
        
        <Players
          player={player}
          table={table}
        />

        {table.deck &&
          <div>
            <Board table={table} />
            <Pot table={table} />
          </div>
        }

        <Seats
          player={player}
          table={table}
          onSeatClick={onSeatClick}
        />

        {this.isOwnTurn() &&
          <ActionButtons
            player={player}
            table={table}
            onRaiseClick={onRaiseClick}
            onCheckClick={onCheckClick}
            onCallClick={onCallClick}
            onFoldClick={onFoldClick}
          />
        }
      </div>
    )
  }
}

export default Game
