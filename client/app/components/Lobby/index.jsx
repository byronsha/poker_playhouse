// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion';

import { logout } from '../../actions/user'
import {
  receiveLobbyInfo, tablesUpdated, playersUpdated,
  tableJoined, tableLeft, tableUpdated
} from '../../actions/lobby'

import MainMenu from './MainMenu'
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import Game from '../Game/Game'
import BuyinModal from '../Game/BuyinModal'
import Button from 'material-ui/Button'

const outerContainer = css`
  display: flex;
  width: 200vw;
  overflow-x: auto;
  transition: transform 0.3s;
`
const innerContainer = css`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`
const lobbyContainer = css`
  ${innerContainer}
  background-image: linear-gradient(to bottom,#0e3877,#2b71b1);
`

type Props = {
  children?: React.Node,
  socket: any,
  user: {
    username: string,
    bankroll: number,
  },
  tables: {
    [key: number]: {},
  },
  players: {
    [key: string]: {},
  },
  openTables: {
    [key: number]: {
      table: Object,
    },
  },
  messages: Array<{
    message: string,
    from: string,
    tableId: number,
  }>,
  gridViewOn: boolean,
  logout: () => void,
  receiveLobbyInfo: (tables: {}, players: {}, socketId: string) => void,
  tablesUpdated: (tables: {}) => void,
  playersUpdated: (players: {}) => void,
  tableJoined: (tables: {}, tableId: number) => void,
  tableLeft: (tables: {}, tableId: number) => void,
  tableUpdated: (table: {}, message: ?string, from: string) => void,
}
type State = {
  modalOpen: boolean,
  tableId: ?number,
  seatId: ?number,
  onMenu: boolean,
}
class Lobby extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
      tableId: null,
      seatId: null,
      onMenu: true,
    }
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
      if (gameChat) {
        gameChat.scrollTop = gameChat.scrollHeight
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { socket, user } = nextProps
    if (!this.props.user && user) {
      socket.emit('fetch_lobby_info', user)    
    }
  }

  handleTableClick = tableId => {
    if (Object.keys(this.props.openTables).length < 4) {
      this.props.socket.emit('join_table', tableId)
    }
    this.setState({ onMenu: false })
  }

  handleLeaveClick = tableId => {
    this.props.socket.emit('leave_table', tableId)
    this.setState({ onMenu: true })    
  }

  handleSeatClick = (tableId, seatId) => {
    this.setState({ modalOpen: true, tableId: tableId, seatId: seatId })
  }

  toggleMenu = () => {
    this.setState({ onMenu: !this.state.onMenu })
  }

  closeModal = () => {
    this.setState({ modalOpen: false, tableId: null, seatId: null })
  }

  buyInAndSitDown = (tableId, seatId, amount) => {
    this.props.socket.emit('sit_down', { tableId, seatId, amount })
  }

  handleRebuy = (tableId, seatId, amount) => {
    this.props.socket.emit('rebuy', { tableId, seatId, amount })
  }

  handleStandClick = tableId => {
    this.props.socket.emit('stand_up', tableId)
  }

  handleRaiseClick = (tableId, amount) => {
    this.props.socket.emit('raise', { tableId, amount })
  }

  handleCheckClick = tableId => {
    this.props.socket.emit('check', tableId)
  }

  handleCallClick = tableId => {
    this.props.socket.emit('call', tableId)
  }

  handleFoldClick = tableId => {
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
      socket,
      user,
      tables,
      players,
      openTables,
      messages,
      logout
    } = this.props

    let table
    let seat

    const isInGame = Object.keys(openTables).length > 0

    if (Object.values(openTables).length > 0) {
      table = Object.values(openTables)[0].table
      seat = Object.values(table.seats).find(seat =>
        seat && seat.player.socketId === socket.id
      )
    }

    if (!user) {
      return <div></div>
    }

    return (
      <div className={outerContainer} style={{ transform: `translateX(${this.state.onMenu ? '0' : '-100vw'})`}}>
        <div className={lobbyContainer}>
          <TopNav />
          {this.props.children ? this.props.children : (
            <MainMenu
              socketId={socket.id}
              user={user}
              logout={logout}
              openTables={openTables}
              tables={tables}
              handleTableClick={this.handleTableClick}
              players={players}
              messages={messages}
            />
          )}
          <BottomNav name={user.username} bankroll={user.bankroll} logout={logout} />
          {isInGame && (
            <Button onClick={() => this.toggleMenu()} style={{ position: 'absolute', top: 0, right: 0, zIndex: 100 }}>
              Back to game
            </Button>
          )}
        </div>

        <div className={innerContainer}>
          <Button onClick={this.toggleMenu} style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
            Main menu
          </Button>                        
          {Object.keys(openTables).length > 0 &&
            Object.values(openTables).map(table =>
              <Game
                key={table.table.id}
                user={user}
                table={table.table}
                messages={table.messages}
                onLeaveClick={this.handleLeaveClick}
                onSeatClick={this.handleSeatClick}
                onStandClick={this.handleStandClick}
                onRaiseClick={this.handleRaiseClick}
                onCheckClick={this.handleCheckClick}
                onCallClick={this.handleCallClick}
                onFoldClick={this.handleFoldClick}
                onTableMessage={this.sendTableMessage}
                socket={socket}
              />
            )
          }
          <BuyinModal
            open={this.state.modalOpen}
            table={table}
            seat={seat}
            tableId={table ? table.id : this.state.tableId}
            seatId={seat ? seat.id : this.state.seatId}
            closeModal={this.closeModal}
            buyInAndSitDown={this.buyInAndSitDown}
            handleRebuy={this.handleRebuy}
          />
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
