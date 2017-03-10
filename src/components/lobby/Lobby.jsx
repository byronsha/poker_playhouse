import React from 'react'
// import io from 'socket.io-client'
import TableList from './TableList'
import PlayerList from './PlayerList'
import Game from '../game/Game'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      tables: {},
      players: {},
      table: null
    }

    this.handleTableClick = this.handleTableClick.bind(this)
    this.handleLeaveClick = this.handleLeaveClick.bind(this)
    this.handleSeatClick = this.handleSeatClick.bind(this)
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

    socket.emit('fetch_lobby_info')
  }

  handleTableClick(tableId) {
    if (!this.state.table) {
      const { socket } = this.props

      socket.emit('join_table', tableId)
    }
  }

  handleLeaveClick() {
    const { socket } = this.props
    const { table } = this.state

    socket.emit('leave_table', table) 
  }

  handleSeatClick(tableId, seatId) {
    const { socket } = this.props

    socket.emit('sit_down', {tableId, seatId})
  }

  render() {
    const props = this.props
    const { player, tables, players, table } = this.state

    return (
      <div>
        <h1>Lobby</h1>
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

        <hr />

        {table &&
          <Game
            player={player}
            table={table}
            onLeaveClick={this.handleLeaveClick}
            onSeatClick={this.handleSeatClick}
          />
        }
      </div>
    )
  }
}

export default Lobby
