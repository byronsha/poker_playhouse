import React from 'react'
import Spectators from './Spectators'
import Seats from './seats/Seats'
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
    const { player, table } = this.props

    for (let i = 1; i <= Object.keys(table.seats).length; i++) {
      if (table.seats[i] && table.seats[i].turn && table.seats[i].player.socketId === player.socketId) {
        return true
      }
    }

    return false
  }

  render() {
    const { player, table, messages, onLeaveClick, onSeatClick, onRaiseClick,
            onCheckClick, onCallClick, onFoldClick, onTableMessage } = this.props

    return (
      <div className="poker-game">
        <div className="table-info">
          <div>
            {table.name}
            <button onClick={() => { onLeaveClick(table.id) }}>Leave table</button>
            <button onClick={this.rotateCounterClockwiseClick}><i className="fa fa-undo" aria-hidden="true"></i></button>
            <button onClick={this.rotateClockwiseClick}><i className="fa fa-repeat" aria-hidden="true"></i></button>
          </div>
          <div>${table.limit.toFixed(2)} NL Holdem</div>
          <div>{table.maxPlayers} players</div>
        </div>
        
        <Spectators
          player={player}
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

        <div className="table-background">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <Seats
          player={player}
          table={table}
          onSeatClick={onSeatClick}
          displayOffset={this.state.displayOffset}
        />

        {this.isOwnTurn() &&
          <Actions
            player={player}
            table={table}
            onRaiseClick={onRaiseClick}
            onCheckClick={onCheckClick}
            onCallClick={onCallClick}
            onFoldClick={onFoldClick}
          />
        }

        <GameChat
          tableId={table.id}
          messages={messages}
          onTableMessage={e => onTableMessage(e, table.id)}  
        />
      </div>
    )
  }
}

export default Game

        /*<div className="game-chat-container">
          <div className="game-chat">
            {messages && messages.map(message => {
              return <div key={message.timestamp}>{message.timestamp} - {message.message}</div>
            })}
          </div>
          <input type="text" onKeyUp={e => onTableMessage(e, table.id)} />
        </div>*/