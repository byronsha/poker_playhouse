// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion';

import { useOutletContext, useLocation } from "react-router-dom";

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
// import { Button } from '../../modules/components';

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
  overflow-y: hidden;
`
const lobbyContainer = css`
  ${innerContainer}
  background: #fafafa;
`

// type Props = {
//   children?: React.Node,
//   socket: any,
//   user: {
//     id: number,
//     username: string,
//     bankroll: number,
//   },
//   account: string,
//   tables: {
//     [key: number]: {
//       table: {
//         limit: number,
//         seats: {
//           [key: number]: ?{
//             stack: number,
//             player: {},
//           },
//         },
//       },
//       messages: Array<string>,
//     },
//   },
//   players: {
//     [socketId: string]: ?{
//       id: number,
//       name: string,
//       bankroll: number,
//     },
//   },
//   openTables: {
//     [key: string]: {
//       table: Object,
//     },
//   },
//   messages: Array<{
//     message: string,
//     from: string,
//     tableId: number,
//   }>,
//   gridViewOn: boolean,
//   logout: () => void,
//   receiveLobbyInfo: (tables: {}, players: {}, socketId: string) => void,
//   tablesUpdated: (tables: {}) => void,
//   playersUpdated: (players: {}) => void,
//   tableJoined: (tables: {}, tableId: number) => void,
//   tableLeft: (tables: {}, tableId: number) => void,
//   tableUpdated: (table: {}, message: ?string, from: string) => void,
// }
// type State = {
//   modalOpen: boolean,
//   tableId: ?number,
//   seatId: ?number,
//   onMenu: boolean,
// }
// class Lobby extends React.Component<Props, State> {
//   constructor() {
//     super()
//     this.state = {
//       modalOpen: false,
//       tableId: null,
//       seatId: null,
//       onMenu: true,
//     }
//   }

//   componentDidMount() {
//     const {
//       socket, user, receiveLobbyInfo, tablesUpdated, playersUpdated,
//       tableJoined, tableLeft, tableUpdated
//     } = this.props

// debugger
//     if (user) {
//       socket.emit('fetch_lobby_info', user)
//     }

//     socket.on('receive_lobby_info', ({ tables, players, socketId }) => {
//       console.log('tables ', tables);
      
//       receiveLobbyInfo(tables, players, socketId)
//     })
//     socket.on('tables_updated', tables => {
//       tablesUpdated(tables)
//     })
//     socket.on('players_updated', players => {
//       playersUpdated(players)
//     })
//     socket.on('table_joined', ({ tables, tableId }) => {
//       tableJoined(tables, tableId)
//     })
//     socket.on('table_left', ({ tables, tableId }) => {
//       tableLeft(tables, tableId)
//     })
//     socket.on('table_updated', ({ table, message, from }) => {
//       tableUpdated(table, message, from)
//       let gameChat = document.getElementById(`table-${table.id}-game-chat`)
//       if (gameChat) {
//         gameChat.scrollTop = gameChat.scrollHeight
//       }
//     })
//   }

//   componentWillReceiveProps(nextProps) {
//     const { socket, user } = nextProps
//     if (!this.props.user && user) {
//       socket.emit('fetch_lobby_info', user)    
//     }
//   }

//   handleTableClick = tableId => {
//     if (Object.keys(this.props.openTables).length < 4) {
//       this.props.socket.emit('join_table', tableId)
//     }
//     this.setState({ onMenu: false })
//   }

//   handleLeaveClick = tableId => {
//     this.props.socket.emit('leave_table', tableId)
//     this.setState({ onMenu: true })    
//   }

//   handleSeatClick = (tableId, seatId) => {
//     this.setState({ modalOpen: true, tableId: tableId, seatId: seatId })
//   }

//   toggleMenu = () => {
//     this.setState({ onMenu: !this.state.onMenu })
//   }

//   closeModal = () => {
//     this.setState({ modalOpen: false, tableId: null, seatId: null })
//   }

//   buyInAndSitDown = (tableId, seatId, amount) => {
//     this.props.socket.emit('sit_down', { tableId, seatId, amount })
//   }

//   handleRebuy = (tableId, seatId, amount) => {
//     this.props.socket.emit('rebuy', { tableId, seatId, amount })
//   }

//   handleStandClick = tableId => {
//     this.props.socket.emit('stand_up', tableId)
//   }

//   handleRaiseClick = (tableId, amount) => {
//     this.props.socket.emit('raise', { tableId, amount })
//   }

//   handleCheckClick = tableId => {
//     this.props.socket.emit('check', tableId)
//   }

//   handleCallClick = tableId => {
//     this.props.socket.emit('call', tableId)
//   }

//   handleFoldClick = tableId => {
//     this.props.socket.emit('fold', tableId)
//   }

//   sendTableMessage = (e, tableId) => {
//     const { socket, user } = this.props
//     const body = e.target.value

//     if (e.keyCode === 13 && body) {
//       socket.emit('table_message', { message: body, from: user.username, tableId })
//       e.target.value = ''
//     }
//   }

//   render() {
//     const {
//       socket,
//       user,
//       tables,
//       players,
//       openTables,
//       messages,
//       logout,
//       account,
//     } = this.props

//     let table
//     let seat

//     const keys = Object.keys(openTables)
//     const isInGame = keys.length > 0

//     if (isInGame) {
//       table = keys[0] && openTables[keys[0]].table
//       const seatKeys = table && Object.keys(table.seats)
//       seat = seatKeys && seatKeys.map(id => table && table.seats[id]).find(seat =>
//         seat && seat.player.socketId === socket.id
//       )
//     }

//     if (!user) {
//       return <div></div>
//     }

//     return (
//       <div className={outerContainer} style={{ transform: `translateX(${this.state.onMenu ? '0' : '-100vw'})`}}>
//         <div className={lobbyContainer}>
//           <TopNav />
//           {this.props.children ? this.props.children : (
//             <MainMenu
//               socketId={socket.id}
//               user={user}
//               logout={logout}
//               openTables={openTables}
//               tables={tables}
//               handleTableClick={this.handleTableClick}
//               players={players}
//               messages={messages}
//               account={account}
//             />
//           )}
//           <BottomNav name={user.username} bankroll={user.bankroll} logout={logout} account={account} />
//           {isInGame && (
//             <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 100 }}>
//               <button onClick={() => this.toggleMenu()}>
//                 Back to game
//               </button>
//             </div>
//           )}
//         </div>

//         <div className={innerContainer}>
//           <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 100 }}>
//           <button onClick={this.toggleMenu}>
//             Main menu
//           </button>                        
//         </div>
//           {Object.keys(openTables).length > 0 &&
//             Object.values(openTables).map(table =>
//               <Game
//                 key={table.table.id}
//                 user={user}
//                 table={table.table}
//                 messages={table.messages}
//                 onLeaveClick={this.handleLeaveClick}
//                 onSeatClick={this.handleSeatClick}
//                 onStandClick={this.handleStandClick}
//                 onRaiseClick={this.handleRaiseClick}
//                 onCheckClick={this.handleCheckClick}
//                 onCallClick={this.handleCallClick}
//                 onFoldClick={this.handleFoldClick}
//                 onTableMessage={this.sendTableMessage}
//                 socket={socket}
//               />
//             )
//           }
//           <BuyinModal
//             open={this.state.modalOpen}
//             table={table}
//             seat={seat}
//             tableId={table ? table.id : this.state.tableId}
//             seatId={seat ? seat.id : this.state.seatId}
//             closeModal={this.closeModal}
//             buyInAndSitDown={this.buyInAndSitDown}
//             handleRebuy={this.handleRebuy}
//           />
//         </div>
//       </div>
//     )
//   }
// }


const Lobby = (props) => {
  // constructor() {
  //   super()
  //   this.state = {
  //     modalOpen: false,
  //     tableId: null,
  //     seatId: null,
  //     onMenu: true,
  //   }
  // }
  const location = useLocation();

  const { socket } = useOutletContext();

  React.useEffect(() => {
    const {
      user, receiveLobbyInfo, tablesUpdated, playersUpdated,
      tableJoined, tableLeft, tableUpdated
    } = props

    if (user) {
      socket.emit('fetch_lobby_info', user)
    }

    socket.on('receive_lobby_info', ({ tables, players, socketId }) => {
      console.log('tables ', tables);
      
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
  }, [])

  // componentWillReceiveProps(nextProps) {
  //   const { socket, user } = nextProps
  //   if (!this.props.user && user) {
  //     socket.emit('fetch_lobby_info', user)    
  //   }
  // }

      // modalOpen: false,
      // tableId: null,
      // seatId: null,
      // onMenu: true,

  const {
    // socket,
    user,
    tables,
    players,
    openTables,
    messages,
    // logout,
    account,
  } = props      

  const [modalOpen, setModalOpen] = React.useState(false);
  const [tableId, setTableId] = React.useState(null);
  const [seatId, setSeatId] = React.useState(null);
  const [onMenu, setOnMenu] = React.useState(true);


  React.useEffect(() => {
    if (user)
    socket.emit('fetch_lobby_info', user)  
  }, [ user ])  



  const handleTableClick = tableId => {
    if (Object.keys(props.openTables).length < 4) {
      socket.emit('join_table', tableId)
    }
    // this.setState({ onMenu: false })
  }

  const handleLeaveClick = tableId => {
    socket.emit('leave_table', tableId)
    // this.setState({ onMenu: true })    
  }

  const handleSeatClick = (tableId, seatId) => {
    // this.setState({ modalOpen: true, tableId: tableId, seatId: seatId })
    setModalOpen(true)
    setTableId(tableId);
    setSeatId(seatId)
  }

  const toggleMenu = () => {
    setOnMenu(!onMenu);
    // this.setState({ onMenu: !this.state.onMenu })
  }

  const closeModal = () => {
    // this.setState({ modalOpen: false, tableId: null, seatId: null })
    setModalOpen(false);
    setTableId(null);
    setSeatId(null)
  }

  const buyInAndSitDown = (tableId, seatId, amount) => {
    socket.emit('sit_down', { tableId, seatId, amount })
  }

  const handleRebuy = (tableId, seatId, amount) => {
    socket.emit('rebuy', { tableId, seatId, amount })
  }

  const handleStandClick = tableId => {
    socket.emit('stand_up', tableId)
  }

  const handleRaiseClick = (tableId, amount) => {
    socket.emit('raise', { tableId, amount })
  }

  const handleCheckClick = tableId => {
    socket.emit('check', tableId)
  }

  const handleCallClick = tableId => {
    socket.emit('call', tableId)
  }

  const handleFoldClick = tableId => {
    socket.emit('fold', tableId)
  }

  const sendTableMessage = (e, tableId) => {
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      socket.emit('table_message', { message: body, from: user.username, tableId })
      e.target.value = ''
    }
  }



  let table
  let seat

  const keys = Object.keys(openTables)
  const isInGame = keys.length > 0

  if (isInGame) {
    table = keys[0] && openTables[keys[0]].table
    const seatKeys = table && Object.keys(table.seats)
    seat = seatKeys && seatKeys.map(id => table && table.seats[id]).find(seat =>
      seat && seat.player.socketId === socket.id
    )
  }

  if (!user) {
    return <div></div>
  }




  return (
    <div className={outerContainer} style={{ transform: `translateX(${onMenu ? '0' : '-100vw'})`}}>
      <div className={lobbyContainer}>
        <TopNav />
        {location.pathname !== '/lobby' ? props.children : (
          <MainMenu
            socketId={socket.id}
            user={user}
            logout={props.logout}
            openTables={openTables}
            tables={tables}
            handleTableClick={handleTableClick}
            players={players}
            messages={messages}
            account={account}
          />
        )}
        <BottomNav name={user.username} bankroll={user.bankroll} logout={props.logout} account={account} />
        {isInGame && (
          <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 100 }}>
            <button onClick={() => toggleMenu()}>
              Back to game
            </button>
          </div>
        )}
      </div>

      <div className={innerContainer}>
        <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 100 }}>
        <button onClick={toggleMenu}>
          Main menu
        </button>                        
      </div>
        {Object.keys(openTables).length > 0 &&
          Object.values(openTables).map(table =>
            <Game
              key={table.table.id}
              user={user}
              table={table.table}
              messages={table.messages}
              onLeaveClick={handleLeaveClick}
              onSeatClick={handleSeatClick}
              onStandClick={handleStandClick}
              onRaiseClick={handleRaiseClick}
              onCheckClick={handleCheckClick}
              onCallClick={handleCallClick}
              onFoldClick={handleFoldClick}
              onTableMessage={sendTableMessage}
              socket={socket}
            />
          )
        }
        <BuyinModal
          open={modalOpen}
          table={table}
          seat={seat}
          tableId={table ? table.id : tableId}
          seatId={seat ? seat.id : seatId}
          closeModal={closeModal}
          buyInAndSitDown={buyInAndSitDown}
          handleRebuy={handleRebuy}
        />
      </div>
    </div>
  )
 }


function mapStateToProps(state) {

  // const account = state.user.user.accounts.find(a => a.id === state.user.accountId);

  return {
    user: state.user.user,
    account: null,
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
