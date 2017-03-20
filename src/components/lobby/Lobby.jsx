import React from 'react'
import TableList from './TableList'
import PlayerList from './PlayerList'
import Game from '../game/Game'
import Chat from './Chat'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      tables: {},
      players: {},
      table: null,
      messages: []
    }

    this.handleTableClick = this.handleTableClick.bind(this)
    this.handleLeaveClick = this.handleLeaveClick.bind(this)
    this.handleSeatClick = this.handleSeatClick.bind(this)

    this.handleRaiseClick = this.handleRaiseClick.bind(this)
    this.handleCheckClick = this.handleCheckClick.bind(this)
    this.handleCallClick = this.handleCallClick.bind(this)
    this.handleFoldClick = this.handleFoldClick.bind(this)
  }

  componentDidMount() {
    const { socket } = this.props
    
    socket.on('receive_lobby_info', ({ tables, players }) => {
      this.setState({
        tables: tables,
        players: players
      })
    })
    socket.on('tables_updated', tables => {
      const oldTable = this.state.table
      const newTable = oldTable ? tables[oldTable.id] : oldTable

      this.setState({
        tables: tables,
        table: newTable
      })
    })
    socket.on('players_updated', players => {
      this.setState({ players: players })
    })
    socket.on('table_joined', ({ tables, tableId }) => {
      this.setState({
        tables,
        table: tables[tableId]
      })
    })
    socket.on('table_left', tables => {
      this.setState({
        tables: tables,
        table: null
      })
    })
    socket.on('table_updated', table => {
      this.setState({ table: table })
    })
    socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })

    socket.emit('fetch_lobby_info')
  }

  handleTableClick(tableId) {
    if (!this.state.table) {
      this.props.socket.emit('join_table', tableId)
    }
  }

  handleLeaveClick() {
    this.props.socket.emit('leave_table', this.state.table) 
  }

  handleSeatClick(tableId, seatId) {
    this.props.socket.emit('sit_down', { tableId, seatId })
  }

  handleRaiseClick(tableId, amount) {
    this.props.socket.emit('raise', ({ tableId, amount }))
  }

  handleCheckClick(tableId) {
    this.props.socket.emit('check', tableId)
  }

  handleCallClick(tableId) {
    this.props.socket.emit('call', tableId)
  }

  handleFoldClick(tableId) {
    this.props.socket.emit('fold', tableId)
  }

  sendMessage = e => {
    const { socket } = this.props
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      socket.emit('message', body)
      e.target.value = ''
    }
  }

  render() {
    const props = this.props
    const { player, tables, players, table } = this.state

    return (
      <div>
        <div id="lobby">
          <span>Logged in as {player.name}</span>

          <TableList
            table={table}
            tables={tables}
            onTableClick={this.handleTableClick}
          />

          <PlayerList
            player={player} 
            players={players}
          />

          <Chat
            messages={this.state.messages}
            sendMessage={this.sendMessage}
          />
        </div>

        {table &&
          <Game
            player={player}
            table={table}
            onLeaveClick={this.handleLeaveClick}
            onSeatClick={this.handleSeatClick}
            onRaiseClick={this.handleRaiseClick}
            onCheckClick={this.handleCheckClick}
            onCallClick={this.handleCallClick}
            onFoldClick={this.handleFoldClick}
          />
        }
      </div>
    )
  }
}

export default Lobby
