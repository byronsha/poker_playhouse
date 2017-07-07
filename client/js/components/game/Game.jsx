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
import { blueGrey } from 'material-ui/styles/colors'
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
  },
  controls: {
    width: '100%',
    position: 'absolute',
    bottom: '0px',
    height: '20vh',
    display: 'flex',
    flexDirection: 'row',
  },
  panel: {
    width: '50%',
    padding: '5px',
    backgroundColor: blueGrey[100],
    border: `1px solid ${blueGrey[100]}`
  },
  emptyPanel: {
    width: '50%'
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
      gridViewOn
    } = this.props

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
              onClick={() => { onStandClick(table.id) }}
            >
              <Icon>arrow_upward</Icon>
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
          <Board table={table} />
          <Background />
          <Seats
            user={user}
            table={table}
            onSeatClick={onSeatClick}
            displayOffset={this.state.displayOffset}
          />
        </div>

        <div className={classes.controls}>
          {this.isOwnTurn() ? (
            <div className={classes.panel}>
              <Actions
                user={user}
                table={table}
                onRaiseClick={onRaiseClick}
                onCheckClick={onCheckClick}
                onCallClick={onCallClick}
                onFoldClick={onFoldClick}
              />
            </div>
          ) : (
            <div className={classes.emptyPanel} />
          )}

          <div className={classes.panel}>
            <GameChat
              playerName={user.username}
              tableId={table.id}
              messages={messages}
              onTableMessage={e => onTableMessage(e, table.id)}  
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styleSheet)(Game)