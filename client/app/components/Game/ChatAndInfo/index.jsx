import React from 'react';

import { blueGrey } from 'material-ui/styles/colors'

import TableControls from '../TableControls';
import Chat from './Chat';
import Spectators from './Spectators';
import SitOutCheckbox from './SitOutCheckbox';

const styles = {
  container: {
    position: 'absolute',
    width: 'calc(50vw - 10px)',
    height: '184px',
    padding: '5px',
    right: '0',
    bottom: '0',
    backgroundColor: blueGrey[100],
    border: `1px solid ${blueGrey[100]}`
  },
  tabs: {
    position: 'absolute',
    display: 'flex',
    height: '30px',
    top: '-30px',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  },
  tab: {
    color: '#999',
    backgroundColor: blueGrey[100],
    padding: '5px 10px',
    margin: '0 2px',
    borderRadius: '3px 3px 0 0',
  },
  activeTab: {
    color: '#333',
    backgroundColor: blueGrey[100],    
    fontWeight: '600',
    padding: '5px 10px',
    margin: '0 2px',
    borderRadius: '3px 3px 0 0',    
  },
}

type Props = {
  user: Object,
  table: Object,
  onLeaveClick: () => void,
  onStandClick: () => void,
  onRotateClockwise: () => void,
  onRotateCounterClockwise: () => void,
}
class ChatAndInfo extends React.Component<Props> {
  constructor() {
    super()

    this.state = {
      activeTab: 'Chat',
    }
  }

  setActiveTab = tabName => {
    this.setState({ activeTab: tabName })
  }

  render() {
    const tabs = ['Chat', 'Players', 'Table Info']
    const { user, table } = this.props;

    return (
      <div style={styles.container}>
        <ul style={styles.tabs}>
          {tabs.map((tab, index) => (
            <li
              key={index}
              style={tab === this.state.activeTab ? styles.activeTab : styles.tab}
              onClick={() => this.setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <TableControls
          onLeaveClick={this.props.onLeaveClick}
          onStandClick={this.props.onStandClick}
          onRotateClockwise={this.props.onRotateClockwise}
          onRotateCounterClockwise={this.props.onRotateCounterClockwise}
        />

        {this.state.activeTab === 'Chat' &&
          <Chat {...this.props} />
        }
        {this.state.activeTab === 'Players' &&
          <Spectators
            user={user}
            table={table}
          />
        }
        {this.state.activeTab === 'Table Info' &&
          <div style={{ padding: '8px' }}>
            {table.name}, ${table.limit.toFixed(2)} NL Holdem, {table.maxPlayers} players                  
          </div>
        }

        <SitOutCheckbox {...this.props} />
      </div>
    )
  }
}

export default ChatAndInfo