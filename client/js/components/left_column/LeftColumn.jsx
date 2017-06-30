import React from 'react'
import TableList from './TableList'
import PlayerList from './PlayerList'
import Chat from './Chat'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import { blueGrey } from 'material-ui/styles/colors'

const styleSheet = createStyleSheet('LeftColumn', theme => ({
  button: {
    position: 'absolute',
    left: '0px',
    bottom: '0px'
  },
  drawer: {
    background: blueGrey[100],
    padding: '10px',
    width: '260px',
    height: '100vh'
  },
}))

const LeftColumn = ({
  open,
  user,
  logout,
  openTables,
  tables,
  handleTableClick,
  toggle,
  toggleGridView,
  players,
  messages,
  sendMessage,
  classes
}) => (
  <div>
    <Drawer docked={true} open={open}>
      <div className={classes.drawer}>
        <div>
          Logged in as {user.username}
          {' '}
          <Button raised color="primary" onClick={logout}>Logout</Button>
        </div>
        
        <TableList
          openTables={Object.keys(openTables)}
          tables={tables}
          onTableClick={handleTableClick}
        />

        <PlayerList
          user={user} 
          players={players}
        />

        <Chat
          messages={messages}
          sendMessage={sendMessage}
        />

        <Button raised color="primary" onClick={toggleGridView}>
          Grid view
        </Button>

        <Button onClick={toggle} className={classes.button}>
          Hide Menu
        </Button>
      </div>
    </Drawer>

    {!open &&
      <Button onClick={toggle} className={classes.button}>
        Show Menu
      </Button>
    }
  </div>
)

export default withStyles(styleSheet)(LeftColumn)