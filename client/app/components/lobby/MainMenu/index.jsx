// @flow
import * as React from 'react'
import { css } from 'emotion'

import TableList from './TableList'
import PlayerList from './PlayerList'

const styles = {
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
  container: css`
    padding: 20px;
    max-width: 1020px;
    margin: 100px auto 0;
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
    [socketId: string]: ?{
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
class MainMenu extends React.Component<Props, State> {
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
      </div>
    )
  }

  render() {
    const {
      user,
      openTables,
      tables,
      handleTableClick,
      players,
    } = this.props

    if (!user) return null;
    const hasTableOpen = Object.keys(openTables).length > 0
    const userPlayer = Object.values(players).find(player => player.id === user.id)
    if (!userPlayer) return null;

    return (
      <div>
        <div className={styles.container}>
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
      </div>
    )
  }
}

export default MainMenu;