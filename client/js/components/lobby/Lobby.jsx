import React from 'react'
import LeftColumn from '../left_column/LeftColumn'
import Game from '../game/Game'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import {
  receiveLobbyInfo, tablesUpdated, playersUpdated,
  tableJoined, tableLeft, tableUpdated
} from '../../actions/lobby'
import {
  toggleLeftColumn, toggleRightColumn, toggleGridView
} from '../../actions/ui'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'

class Lobby extends React.Component {
  constructor() {
    super()

    this.handleTableClick = this.handleTableClick.bind(this)
    this.handleLeaveClick = this.handleLeaveClick.bind(this)
    this.handleSeatClick = this.handleSeatClick.bind(this)
    this.handleStandClick = this.handleStandClick.bind(this)
    this.handleRaiseClick = this.handleRaiseClick.bind(this)
    this.handleCheckClick = this.handleCheckClick.bind(this)
    this.handleCallClick = this.handleCallClick.bind(this)
    this.handleFoldClick = this.handleFoldClick.bind(this)
  }

  componentDidMount() {
    const {
      socket, user, receiveLobbyInfo, tablesUpdated, playersUpdated,
      tableJoined, tableLeft, tableUpdated
    } = this.props

    if (user) {
      socket.emit('fetch_lobby_info', user)
    }

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
  }

  componentWillReceiveProps(nextProps) {
    const { socket, user } = nextProps
    if (!this.props.user && user) {
      socket.emit('fetch_lobby_info', user)    
    }
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

  handleStandClick(tableId) {
    this.props.socket.emit('stand_up', tableId)
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

  render() {
    const {
      user,
      tables,
      players,
      openTables,
      messages,
      leftColumnShowing,
      rightColumnShowing,
      gridViewOn,
      toggleLeftColumn,
      toggleRightColumn,
      toggleGridView,
      logout
    } = this.props

    if (!user) {
      return <div></div>
    }

    return (
      <div>
        <LeftColumn
          open={leftColumnShowing}
          user={user}
          logout={logout}
          openTables={openTables}
          tables={tables}
          handleTableClick={this.handleTableClick}
          toggle={toggleLeftColumn}
          toggleGridView={toggleGridView}
          players={players}
          messages={messages}
          sendMessage={this.sendMessage}
        />

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
                onStandClick={this.handleStandClick}
                onRaiseClick={this.handleRaiseClick}
                onCheckClick={this.handleCheckClick}
                onCallClick={this.handleCallClick}
                onFoldClick={this.handleFoldClick}
                onTableMessage={this.sendTableMessage}
              />
            )
          }
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
    messages: state.lobby.messages,
    leftColumnShowing: state.ui.leftColumnShowing,
    rightColumnShowing: state.ui.rightColumnShowing,
    gridViewOn: state.ui.gridViewOn
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
  toggleLeftColumn,
  toggleRightColumn,
  toggleGridView
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
