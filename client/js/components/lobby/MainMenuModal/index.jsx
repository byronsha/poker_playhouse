// @flow
import React from 'react'
import { css } from 'emotion'

import TableList from './TableList'
import PlayerList from './PlayerList'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'

const styles = {
  container: {
    position: 'relative',
    background: '#fff',
    padding: '24px',
    width: '600px',
    height: '500px',
    borderRadius: '4px',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: '0px',
    width: '600px',
    lineHeight: '1.5em',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '8px',
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
      <div style={{ display: 'flex', marginBottom: '16px' }}>
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
      toggleModal,
      players,
    } = this.props

    if (!user) return null;
    const hasTableOpen = Object.keys(openTables).length > 0
    const userPlayer = Object.values(players).find(player => player.id === user.id)
    
    return (    
      <Dialog open={open} onBackdropClick={toggleModal}>
        <div style={styles.container}>
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
          <div style={styles.logoutContainer}>
            <div>Logged in as {userPlayer && userPlayer.name}</div>
            <div>Balance: ${userPlayer && userPlayer.bankroll.toFixed(2)}</div>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default MainMenuModal;