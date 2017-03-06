import React from 'react'
import ChatContainer from './ChatContainer'
import io from 'socket.io-client'

class Game extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      table: locationState.table
    }

    this.leaveTable = this.leaveTable.bind(this)
  }

  componentDidMount() {
    this.socket = io('/')
    
    this.socket.on('tables_updated', tables => {
      this.setState({ table: tables[this.state.table.id] })
    })
    this.socket.on('table_left', player => {
      this.props.router.push({
        pathname: '/lobby',
        state: { player }
      })
    })
  }

  leaveTable() {
    const { player, table } = this.state
    this.socket.emit('leave_table', {
      player,
      table
    })
  }

  renderPlayers() {
    const { table } = this.state

    if (table.players.length > 0) {
      return (
        <div>
          <ul>
            {table.players.map((player) => {
              return <li key={player.player.socketId}>{player.player.name}, {player.stack}, {player.player.socketId}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    const { table } = this.state

    return (
      <div>
        <h1>{table.name} | {table.limit} NL | {table.maxPlayers} players</h1>
        
        {this.renderPlayers()}
        <button onClick={this.leaveTable}>Leave table</button>
      </div>
    )
  }
}

// <ChatContainer />
export default Game
