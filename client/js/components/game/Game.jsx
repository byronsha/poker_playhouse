import React from 'react'
import Spectators from './Spectators'
import Seats from './seats/Seats'
import Background from './Background'
import Board from './Board'
import Actions from './actions/Actions'
import ChipPile from './pieces/ChipPile'
import GameChat from './chat/GameChat'

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
    const { user, table } = this.props

    for (let i = 1; i <= Object.keys(table.seats).length; i++) {
      if (
        table.seats[i] &&
        table.seats[i].turn &&
        table.seats[i].player.name === user.username
      ) {
        return true
      }
    }
    return false
  }

  render() {
    const { user, table, messages, onLeaveClick, onSeatClick, onRaiseClick,
            onCheckClick, onCallClick, onFoldClick, onTableMessage, gridViewOn } = this.props

    const gameClass = gridViewOn ? 'poker-game poker-game-small' : 'poker-game'
    
    return (
      <div className={gameClass}>
        <div className="table-info">
          <div>
            {table.name}, ${table.limit.toFixed(2)} NL Holdem, {table.maxPlayers} players
            <button onClick={() => { onLeaveClick(table.id) }}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
            <button onClick={this.rotateCounterClockwiseClick}><i className="fa fa-undo" aria-hidden="true"></i></button>
            <button onClick={this.rotateClockwiseClick}><i className="fa fa-repeat" aria-hidden="true"></i></button>
          </div>
        </div>
        
        <Spectators
          user={user}
          table={table}
        />

        <div className="board">
          {table.mainPot > 0 &&
            <div>
              <ChipPile amount={table.mainPot.toFixed(2)} />
              <div>Main Pot: ${table.mainPot.toFixed(2)}</div>  
            </div>
          }

          <Board table={table} />
          
          <div className="pot">
            Total Pot: ${table.pot.toFixed(2)}
          </div>
        </div>

        <Background />

        <Seats
          user={user}
          table={table}
          onSeatClick={onSeatClick}
          displayOffset={this.state.displayOffset}
        />

        {this.isOwnTurn() &&
          <Actions
            user={user}
            table={table}
            onRaiseClick={onRaiseClick}
            onCheckClick={onCheckClick}
            onCallClick={onCallClick}
            onFoldClick={onFoldClick}
          />
        }

        <GameChat
          playerName={user.username}
          tableId={table.id}
          messages={messages}
          onTableMessage={e => onTableMessage(e, table.id)}  
        />
      </div>
    )
  }
}

export default Game