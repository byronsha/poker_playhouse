import React from 'react'
import Players from './Players'
import Seats from './Seats'

class Game extends React.Component {
  render() {
    const { table, onLeaveClick } = this.props

    return (
      <div>
        <h1>{table.name} | {table.limit} NL | {table.maxPlayers} players</h1>
        <button onClick={() => { onLeaveClick() }}>Leave table</button>
        
        <Players table={table} />
        <Seats table={table} />
      </div>
    )
  }
}

export default Game
