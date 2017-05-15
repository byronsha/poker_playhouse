import React from 'react'
import TableList from '../left_column/TableList'
import PlayerList from '../right_column/PlayerList'
import Chat from '../right_column/Chat'
import Game from '../game/Game'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import {
  receiveLobbyInfo, tablesUpdated, playersUpdated,
  tableJoined, tableLeft, tableUpdated, messageReceived
} from '../../actions/lobby'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      leftColumnShowing: true,
      rightColumnShowing: true,
      gridViewOn: false
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
    this.toggleGridView = this.toggleGridView.bind(this)
  }

  componentDidMount() {
    const {
      socket, user, receiveLobbyInfo, tablesUpdated, playersUpdated,
      tableJoined, tableLeft, tableUpdated, messageReceived
    } = this.props

    socket.emit('fetch_lobby_info', user)

    socket.on('receive_lobby_info', ({ tables, players, socketId }) => {
      receiveLobbyInfo(tables, players, socketId)
    })
    socket.on('tables_updated', tables => {
      tablesUpdated(tables)
    })
    socket.on('players_updated', players => {
      playersUpdated(players)
    })
    socket.on('table_joined', ({ tables, tableId }) => {
      tableJoined(tables, tableId)
    })
    socket.on('table_left', ({ tables, tableId }) => {
      tableLeft(tables, tableId)
    })
    socket.on('table_updated', ({ table, message, from }) => {
      tableUpdated(table, message, from)
      let gameChat = document.getElementById(`table-${table.id}-game-chat`)
      gameChat.scrollTop = gameChat.scrollHeight
    })
    socket.on('message', message => {
      messageReceived(message)
    })
  }

  handleTableClick(tableId) {
    if (Object.keys(this.props.openTables).length < 4) {
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
    const { socket, user } = this.props
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      socket.emit('table_message', { message: body, from: user.username, tableId })
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

  toggleGridView() {
    this.setState({ gridViewOn: !this.state.gridViewOn })
  }

  render() {
    const { user, tables, players, openTables, messages } = this.props
    const { gridViewOn, leftColumnShowing, rightColumnShowing } = this.state

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
          
          <div className="player-info">Logged in as {user.username}</div>
          
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
                user={user}
                table={table.table}
                gridViewOn={gridViewOn}
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
            user={user} 
            players={players}
          />

          <Chat
            messages={messages}
            sendMessage={this.sendMessage}
          />

          <button onClick={this.toggleGridView}>
            Grid view
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    tables: state.lobby.tables,
    players: state.lobby.players,
    openTables: state.lobby.openTables,
    messages: state.lobby.messages
  }
}

const mapDispatchToProps = ({
  logout,
  receiveLobbyInfo,
  tablesUpdated,
  playersUpdated,
  tableJoined,
  tableLeft,
  tableUpdated,
  messageReceived
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
