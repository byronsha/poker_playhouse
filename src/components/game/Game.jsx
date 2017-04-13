import React from 'react'
import Players from './Players'
import Seats from './Seats'
import Board from './Board'
import ActionButtons from './ActionButtons'

class Game extends React.Component {
  constructor() {
    super()

    this.state = {
      displayOffset: 0
    }

    this.rotateClockwiseClick = this.rotateClockwiseClick.bind(this)
    this.rotateCounterClockwiseClick = this.rotateCounterClockwiseClick.bind(this)
  }

  rotateClockwiseClick() {
    let currentOffset = this.state.displayOffset
    let maxOffset = this.props.table.maxPlayers - 1
    let newOffset = currentOffset === maxOffset ? 0 : currentOffset + 1
    this.setState({ displayOffset: newOffset })
  }

  rotateCounterClockwiseClick() {
    let currentOffset = this.state.displayOffset
    let maxOffset = this.props.table.maxPlayers - 1
    let newOffset = currentOffset === 0 ? maxOffset : currentOffset - 1
    this.setState({ displayOffset: newOffset })    
  }

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
      <div className="poker-game">
        <span>
          {table.name} | {table.limit} NL | {table.maxPlayers} players
          <button onClick={() => { onLeaveClick() }}>Leave table</button>
        </span>
        
        <div>
          <span onClick={this.rotateClockwiseClick}>Rotate clockwise</span>
          <span onClick={this.rotateCounterClockwiseClick}>Rotate counter-clockwise</span>
        </div>
        
        <Players
          player={player}
          table={table}
        />

        <div className="board">
          {table.mainPot > 0 &&
            <div>Main Pot: ${table.mainPot.toFixed(2)}</div>  
          }

          <Board table={table} />
          
          <div className="pot">
            Total Pot: ${table.pot.toFixed(2)}
          </div>
        </div>

        <Seats
          player={player}
          table={table}
          onSeatClick={onSeatClick}
          displayOffset={this.state.displayOffset}
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
