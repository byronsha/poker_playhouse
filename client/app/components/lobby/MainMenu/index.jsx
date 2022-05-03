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
    max-width: 525px;
    margin: 200px auto 0;
  `,
}

type Props = {
  user: {
    id: number,
    username: string,
    bankroll: number,
  },
  logout: () => void,
  openTables: {},
  tables: {},
  handleTableClick: (tableId: number) => void,
  players: {
    [socketId: string]: ?{
      id: number,
      name: string,
      bankroll: number,
    },
  },
}
type State = {
  activeTab: 'free' | 'playToEarn' | 'PvP',
}

class MainMenu extends React.Component<Props, State> {
  state = {
    activeTab: 'free'
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
            className={activeTab === 'free' ? styles.activeTab : styles.tab}
            onClick={() => this.setState({ activeTab: 'free' })}>
            Free
          </span>
          <span
            className={activeTab === 'playToEarn' ? styles.activeTab : styles.tab}        
            onClick={() => this.setState({ activeTab: 'playToEarn' })}>
            play to earn
          </span>
          <span
            className={activeTab === 'PvP' ? styles.activeTab : styles.tab}        
            onClick={() => this.setState({ activeTab: 'PvP' })}>
            PvP
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
    const userPlayer = Object.values(players).find(player =>
      player && player.id && player.id === user.id
    )
    if (!userPlayer) return null;

    const tablesByType = Object.entries(tables).map(item => item[1]).reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = { [item.id]: item };
      else acc[item.type] = { ...acc[item.type], [item.id]: item };

      return acc;
    }, {})

    return (
      <div>
        <div className={styles.container}>
          {this.renderTabs()}
          {this.state.activeTab === 'free' &&
            <TableList
            tables={tablesByType.free}
            onTableClick={handleTableClick}
            openTables={Object.keys(openTables)}
            hasTableOpen={hasTableOpen}
            />
          }
          {this.state.activeTab === 'playToEarn' &&
            <TableList
            tables={tablesByType.playToEarn}
            onTableClick={handleTableClick}
            openTables={Object.keys(openTables)}
            hasTableOpen={hasTableOpen}
            />
          }
          {this.state.activeTab === 'PvP' &&
            <TableList
            tables={tablesByType.PvP}
            onTableClick={handleTableClick}
            openTables={Object.keys(openTables)}
            hasTableOpen={hasTableOpen}
            />
          }
        </div>
      </div>
    )
  }
}

export default MainMenu;