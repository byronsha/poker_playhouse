import React from 'react'
import TableList from '../left_column/TableList'
import PlayerList from '../right_column/PlayerList'
import Chat from '../right_column/Chat'
import Game from '../game/Game'
import Moment from 'moment'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      tables: {},
      players: {},
      openTables: {},
      messages: [],
      leftColumnShowing: true,
      rightColumnShowing: true
    }

    this.handleTableClick = this.handleTableClick.bind(this)
    this.handleLeaveClick = this.handleLeaveClick.bind(this)
    this.handleSeatClick = this.handleSeatClick.bind(this)

    this.handleRaiseClick = this.handleRaiseClick.bind(this)
    this.handleCheckClick = this.handleCheckClick.bind(this)
    this.handleCallClick = this.handleCallClick.bind(this)
    this.handleFoldClick = this.handleFoldClick.bind(this)

    this.toggleLeftColumn = this.toggleLeftColumn.bind(this)
    this.toggleRightColumn = this.toggleRightColumn.bind(this)
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
      let newOpenTables = this.state.openTables

      for (let tableId of Object.keys(newOpenTables)) {
        newOpenTables[tableId].table = tables[tableId]
      }

      this.setState({
        tables: tables,
        openTables: newOpenTables
      })
    })
    socket.on('players_updated', players => {
      this.setState({ players: players })
    })
    socket.on('table_joined', ({ tables, tableId }) => {
      let newOpenTables = this.state.openTables

      newOpenTables[tableId] = {
        table: tables[tableId],
        messages: []
      }

      this.setState({
        tables,
        openTables: newOpenTables
      })
    })
    socket.on('table_left', ({ tables, tableId }) => {
      let newOpenTables = this.state.openTables
      delete newOpenTables[tableId]

      this.setState({
        tables: tables,
        openTables: newOpenTables
      })
    })
    socket.on('table_updated', ({ table, message, from }) => {
      let newOpenTables = this.state.openTables
      let newMessage = {
        message,
        from,
        timestamp: Moment().format('LTS')
      }

      if (newOpenTables[table.id]) {
        newOpenTables[table.id].table = table
        newOpenTables[table.id].messages.push(newMessage)

        for (let winMessage of table.winMessages) {
          let newMessage = {
            message: winMessage,
            from,
            timestamp: Moment().format('LTS')
          }
          newOpenTables[table.id].messages.push(newMessage)          
        }
      }

      this.setState({ openTables: newOpenTables })

      let gameChat = document.getElementById(`table-${table.id}-game-chat`)
      gameChat.scrollTop = gameChat.scrollHeight
    })
    socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })

    socket.emit('fetch_lobby_info')
  }

  handleTableClick(tableId) {
    if (Object.keys(this.state.openTables).length < 4) {
      this.props.socket.emit('join_table', tableId)
    }
  }

  handleLeaveClick(tableId) {
    this.props.socket.emit('leave_table', tableId) 
  }

  handleSeatClick(tableId, seatId) {
    this.props.socket.emit('sit_down', { tableId, seatId })
  }

  handleRaiseClick(tableId, amount) {
    this.props.socket.emit('raise', { tableId, amount })
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

  sendTableMessage = (e, tableId) => {
    const { socket } = this.props
    const { player } = this.state
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      socket.emit('table_message', { message: body, from: player.name, tableId })
      e.target.value = ''
    }
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

  toggleLeftColumn() {
    this.setState({ leftColumnShowing: !this.state.leftColumnShowing })
  }

  toggleRightColumn() {
    this.setState({ rightColumnShowing: !this.state.rightColumnShowing })
  }

  render() {
    const props = this.props
    const { player, tables, players, openTables, leftColumnShowing, rightColumnShowing } = this.state

    let leftColumnClass = leftColumnShowing ? 'left-column' : 'left-column hidden'
    let rightColumnClass = rightColumnShowing ? 'right-column' : 'right-column hidden'

    return (
      <div>
        <div className={leftColumnClass}>
          <button
            onClick={this.toggleLeftColumn}
            className="toggle-left-column-btn"
          >
            {leftColumnShowing &&
              <i className="fa fa-angle-left" aria-hidden="true"></i>}
            {!leftColumnShowing &&
              <i className="fa fa-angle-right" aria-hidden="true"></i>}
          </button>
          
          <div className="player-info">Logged in as {player.name}</div>
          
          <TableList
            openTables={Object.keys(openTables)}
            tables={tables}
            onTableClick={this.handleTableClick}
          />
        </div>

        <div className="center-column">
          {Object.keys(openTables).length > 0 &&
            Object.values(openTables).map(table =>
              <Game
                key={table.table.id}
                player={player}
                table={table.table}
                messages={table.messages}
                onLeaveClick={this.handleLeaveClick}
                onSeatClick={this.handleSeatClick}
                onRaiseClick={this.handleRaiseClick}
                onCheckClick={this.handleCheckClick}
                onCallClick={this.handleCallClick}
                onFoldClick={this.handleFoldClick}
                onTableMessage={this.sendTableMessage}
              />
            )
          }
        </div>

        <div className={rightColumnClass}>
          <button
            onClick={this.toggleRightColumn}
            className="toggle-right-column-btn"
          >
            {rightColumnShowing &&
              <i className="fa fa-angle-right" aria-hidden="true"></i>}
            {!rightColumnShowing &&
              <i className="fa fa-angle-left" aria-hidden="true"></i>}
          </button>

          <PlayerList
            player={player} 
            players={players}
          />

          <Chat
            messages={this.state.messages}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    )
  }
}

export default Lobby

//  <div className="fancy-chip blue">
//   <div><span>PF</span></div>
//  </div>