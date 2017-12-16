import React from 'react'
import TableList from './TableList'
import PlayerList from './PlayerList'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import { blueGrey } from 'material-ui/styles/colors'

const styleSheet = createStyleSheet('LeftColumn', theme => ({
  showButton: {
    position: 'absolute',
    bottom: '0',
    left: '0'
  },
  drawer: {
    background: blueGrey[100],
    padding: '10px',
    width: '250px',
    height: '100vh'
  },
  button: {
    minHeight: '28px',
    padding: '6px 12px',
    marginRight: '4px',
  }
}))

const LeftColumn = ({
  socketId,
  open,
  user,
  logout,
  openTables,
  tables,
  handleTableClick,
  toggle,
  toggleGridView,
  players,
  classes
}) => {
  const hasTableOpen = Object.keys(openTables).length > 0
  return (
    <div>
      <Drawer docked={true} open={open}>
        <div className={classes.drawer}>
          <div style={{ display: 'flex' }}>
            <div>
              Logged in as {user.username}
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                raised
                color="primary"
                onClick={logout}
                className={classes.button}
              >
                Logout
              </Button>
            </div>
          </div>
          
          <TableList
            tables={tables}
            onTableClick={handleTableClick}
            openTables={Object.keys(openTables)}
            hasTableOpen={hasTableOpen}
          />

          <PlayerList
            user={user} 
            players={players}
          />

          <Button raised className={classes.button} onClick={toggleGridView}>
            Grid view
          </Button>
          <Button raised onClick={toggle} className={classes.button}>
            Hide Menu
          </Button>
        </div>
      </Drawer>

      {!open &&
        <Button onClick={toggle} className={classes.showButton}>
          Show Menu
        </Button>
      }
    </div>
  )
}

export default withStyles(styleSheet)(LeftColumn)