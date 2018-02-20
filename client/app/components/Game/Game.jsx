import React from 'react'
import Seats from './Seats'
import Background from './Pieces/Background'
import Board from './Pieces/Board'
import Actions from './Actions'
import ChatAndInfo from './ChatAndInfo';
import TableControls from './TableControls';

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
    for (let seat of Object.values(table.seats)) {
      if (seat && seat.turn && seat.player.name === user.username) {
        return true
      }
    }
    return false
  }

  render() {
    const {
      classes,
      user,
      table,
      messages,
      onLeaveClick,
      onSeatClick,
      onStandClick,
      onRaiseClick,
      onCheckClick,
      onCallClick,
      onFoldClick,
      onTableMessage,
      gridViewOn,
      socket
    } = this.props

    const gameClass = gridViewOn ? 'poker-game poker-game-small' : 'poker-game'
    const seat = Object.values(table.seats).find(seat =>
      seat && seat.player.socketId === socket.id
    )

    return (
      <div>
        <div className={gameClass}>
          <Board table={table} />
          <Background />
          <Seats
            user={user}
            table={table}
            onSeatClick={onSeatClick}
            displayOffset={this.state.displayOffset}
          />
        </div>

        <TableControls
          onLeaveClick={() => onLeaveClick(table.id)}
          onStandClick={() => onStandClick(table.id)}
          onRotateClockwise={this.rotateClockwiseClick}
          onRotateCounterClockwise={this.rotateCounterClockwiseClick}
          />
        {this.isOwnTurn() && (
          <Actions
            user={user}
            table={table}
            onRaiseClick={onRaiseClick}
            onCheckClick={onCheckClick}
            onCallClick={onCallClick}
            onFoldClick={onFoldClick}
          />
        )}
        <ChatAndInfo
          socket={socket}
          user={user}
          table={table}
          seat={seat}
          messages={messages}
          onTableMessage={e => onTableMessage(e, table.id)}  
        />
      </div>
    )
  }
}

export default Game