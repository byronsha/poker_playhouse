// @flow
import * as React from 'react'
import { css } from 'emotion'

import TableList from './TableList'
import PlayerList from './PlayerList'
import Button from 'material-ui/Button'

const styles = {
  container: {
    position: 'absolute',
    top: '200px',
    background: '#eee',
    width: '300px',
    height: '450px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    border: '1px solid #ccc',
    zIndex: '2',
    boxShadow: '0 1px 2px 0px #ccc',
    transition: 'left 0.5s',
  },
  innerContainer: {
    padding: '12px 6px',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    lineHeight: '1.5em',
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: css`
    font-size: 20px;
    margin-right: 30px;
    transition: 100ms ease;

    &:hover {
      cursor: pointer;
      color: #2196f3;    
      border-bottom: 2px solid #2196f3;    
    }
  `,
  activeTab: css`
    font-size: 20px;
    margin-right: 30px;   
    color: #2196f3;
    border-bottom: 2px solid #2196f3;
    font-weight: 600;
  `,
}

const closeButton = css`
  color: black;
  margin-right: 4px;
  margin-bottom: 5px;
  transform: scaleX(1.5);
  &:hover {
    cursor: pointer;
    color: #333;
  }
`

type Props = {
  open: boolean,
  user: {
    id: number,
  },
  logout: () => void,
  openTables: {},
  tables: {},
  handleTableClick: (tableId: number) => void,
  toggleModal: () => void,
  players: {
    [socketId: string]: {
      id: number,
      name: string,
      bankroll: number,
    },
  },
  onClose: () => void,
}
type State = {
  activeTab: 'games' | 'players',
}
class MainMenuModal extends React.Component<Props, State> {
  state = {
    activeTab: 'games'
  }

  renderTabs() {
    const { activeTab } = this.state
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div>
          <span
            className={activeTab === 'games' ? styles.activeTab : styles.tab}
            onClick={() => this.setState({ activeTab: 'games' })}>
            Games
          </span>
          <span
            className={activeTab === 'players' ? styles.activeTab : styles.tab}        
            onClick={() => this.setState({ activeTab: 'players' })}>
            Players
          </span>
        </div>
        <div onClick={this.props.onClose} className={closeButton}>X</div>
      </div>
    )
  }

  render() {
    const {
      open,
      user,
      logout,
      openTables,
      tables,
      handleTableClick,
      players,
    } = this.props

    if (!user) return null;
    const hasTableOpen = Object.keys(openTables).length > 0
    const userPlayer = Object.values(players).find(player => player.id === user.id)
    
    return (
      <div style={{ ...styles.container, left: open ? '0' : '-300px' }}>
        <div style={styles.innerContainer}>
          {this.renderTabs()}
          {this.state.activeTab === 'games' &&
            <TableList
              tables={tables}
              onTableClick={handleTableClick}
              openTables={Object.keys(openTables)}
              hasTableOpen={hasTableOpen}
            />
          }
          {this.state.activeTab === 'players' &&
            <PlayerList
              user={user} 
              players={players}
            />
          }
        </div>
        <div style={styles.logoutContainer}>
          <div style={styles.innerContainer}>
            <span>Balance: ${userPlayer && userPlayer.bankroll.toFixed(2)}</span>
            <br/>
            <span>Logged in as {userPlayer && userPlayer.name}</span>
          </div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    )
  }
}

export default MainMenuModal;