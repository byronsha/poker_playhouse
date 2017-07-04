import React from 'react'
import Message from './Message'
import { blueGrey } from 'material-ui/styles/colors'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Input from 'material-ui/Input/Input'

const styleSheet = createStyleSheet('GameChat', theme => ({
  container: {
    height: '100%',
    fontFamily: 'Roboto'
  },
  messages: {
    height: '78%',
    padding: '3px',
    margin: '3px',
    color: '#fff',
    background: blueGrey[900],
    overflowY: 'auto',
  },
  input: {
    width: 'calc(100% - 12px)',
    padding: '0px 3px',
    margin: '3px',
    background: blueGrey[900],
    color: '#fff',
    overflow: 'hidden',
  }
}))

const GameChat = ({
  playerName,
  tableId,
  messages,
  onTableMessage,
  classes
}) => (
  <div className={classes.container}>
    <div id={`table-${tableId}-game-chat`} className={classes.messages}>
      {messages.map((message, index) =>
        <Message key={message.timestamp + index} message={message} />
      )}
    </div>

    <Input
      type="text"
      placeholder="Send a message"
      onKeyUp={onTableMessage}
      className={classes.input}
    />
  </div>
)

export default withStyles(styleSheet)(GameChat)