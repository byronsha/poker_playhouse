/*import React from 'react'
import PlayerList from './PlayerList'
import Chat from './Chat'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'

const styleSheet = createStyleSheet('RightColumn', theme => ({
  button: {
    position: 'absolute',
    right: '0px',
    bottom: '0px'
  },
  drawer: {
    padding: '10px',
    width: '260px'
  },
}))

const RightColumn = ({
  open,
  user,
  players,
  messages,
  sendMessage,
  toggle,
  toggleGridView,
  classes
}) => (
  <div>
    {!open &&
      <Button onClick={toggle} className={classes.button}>
        Show Chat
      </Button>
    }

    <Drawer anchor="right" docked={true} open={open}>
      <div className={classes.drawer}>
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
          Hide Chat
        </Button>
      </div>
    </Drawer>
  </div>
)

export default withStyles(styleSheet)(RightColumn)*/