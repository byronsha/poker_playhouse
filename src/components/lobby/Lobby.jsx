import React from 'react'
import io from 'socket.io-client'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      tables: {},
      players: {}
    }
  }

  componentDidMount() {
    this.socket = io('/')
    
    this.socket.on('receive_lobby_info', ({ tables, players }) => {
      this.setState({
        tables: tables,
        players: players
      })
    })
    this.socket.on('tables_updated', tables => {
      this.setState({ tables: tables })
    })
    this.socket.on('players_updated', players => {
      this.setState({ players: players })
    })
    this.socket.on('table_joined', table => {
      const { player } = this.state
      this.props.router.push({
        pathname: `/game/${table.id}`,
        state: { player, table }
      })
    })

    this.socket.emit('fetch_lobby_info')
  }

  handleTableClick(tableId) {
    const { player } = this.state
    this.socket.emit('join_table', {
      tableId,
      player
    })
  }

  renderTableList() {
    const { tables } = this.state

    if (Object.keys(tables).length > 0) {
      return (
        <div>
          <ul>
            {Object.keys(tables).map((id) => {
              return (
                <li key={id}>
                  {tables[id].name}, {tables[id].players.length}/{tables[id].maxPlayers}
                  <button onClick={() => { this.handleTableClick(tables[id].id) }}>Join</button>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  renderPlayerList() {
    const { players } = this.state
    
    if (Object.keys(players).length > 0) {
      return (
        <div>
          <ul>
            {Object.keys(players).map((id) => {
              return <li key={id}>{players[id].name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <span>Logged in as {this.state.player.name}</span>
        <h2>Tables</h2>
        {this.renderTableList()}
        <h2>Players</h2>
        {this.renderPlayerList()}
      </div>
    )
  }
}

export default Lobby
