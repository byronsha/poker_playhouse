import React from 'react'
import Spectators from './Spectators'
import Seats from './seats/Seats'
import Background from './Background'
import Board from './Board'
import Actions from './actions/Actions'
import ChipPile from './pieces/ChipPile'
import GameChat from './chat/GameChat'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('Game', theme => ({
  tableInfo: {
    fontFamily: 'Roboto',
    padding: '0px 10px'
  },
  controlButton: {
    float: 'right',
    margin: '2px',
    width: '36px',
    height: '36px'
  }
}))

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
    const { classes, user, table, messages, onLeaveClick, onSeatClick, onRaiseClick,
            onCheckClick, onCallClick, onFoldClick, onTableMessage, gridViewOn } = this.props

    const gameClass = gridViewOn ? 'poker-game poker-game-small' : 'poker-game'
    
    return (
      <div className={gameClass}>
        <div className={classes.tableInfo}>
          <div>
            {table.name}, ${table.limit.toFixed(2)} NL Holdem, {table.maxPlayers} players
            <Button
              fab
              color="primary"
              className={classes.controlButton}
              onClick={() => { onLeaveClick(table.id) }}
            >
              <Icon>exit_to_app</Icon>
            </Button>

            <Button
              fab
              color="primary"
              className={classes.controlButton}
              onClick={this.rotateCounterClockwiseClick}
            >
              <Icon>loop</Icon>
            </Button>

            <Button
              fab
              color="primary"
              className={classes.controlButton}
              onClick={this.rotateClockwiseClick}
            >
              <Icon>autorenew</Icon>
            </Button>
          </div>
        </div>
        
        <Spectators
          user={user}
          table={table}
        />

        <div>
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
        </div>

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

export default withStyles(styleSheet)(Game)


//  style={{width: '75%', height: '85%',
//         top: '0px',
//         left: '0px',
//         position: 'relative'}}