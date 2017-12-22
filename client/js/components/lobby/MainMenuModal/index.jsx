import React from 'react'
import TableList from './TableList'
import PlayerList from './PlayerList'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { blueGrey } from 'material-ui/styles/colors'

const styleSheet = createStyleSheet('MainMenuModal', theme => ({
  container: {
    position: 'relative',
    background: '#fff',
    padding: '24px',
    width: '400px',
    height: '600px',
    borderRadius: '4px',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: '0px',
    width: '400px',
    lineHeight: '1.5em',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '8px',
    justifyContent: 'space-between',
  },
}))

const MainMenuModal = ({
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
  if (!user) return null;
  const hasTableOpen = Object.keys(openTables).length > 0
  const userPlayer = Object.values(players).find(player => player.id === user.id)
  
  return (    
    <Dialog open={open} onBackdropClick={toggle}>
      <div className={classes.container}>
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
        <div className={classes.logoutContainer}>
          <div>Logged in as {userPlayer && userPlayer.name}</div>
          <div>Balance: ${userPlayer && userPlayer.bankroll}</div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </Dialog>
  )
}

export default withStyles(styleSheet)(MainMenuModal)