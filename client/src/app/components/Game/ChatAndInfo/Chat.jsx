import React from 'react'
import Message from './Message'
import { blueGrey } from 'material-ui/styles/colors'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Input from 'material-ui/Input/Input'

const styleSheet = createStyleSheet('GameChat', theme => ({
  container: {
    height: '100%',
  },
  messages: {
    fontFamily: 'Montserrat, sans-serif',
    height: '144px',
    padding: '3px',
    color: '#fff',
    background: blueGrey[900],
    overflowY: 'auto',
  },
  input: {
    fontFamily: 'Montserrat, sans-serif',    
    display: 'block',
    padding: '0px 3px',
    margin: '4px 0px',
    background: blueGrey[900],
    color: '#fff',
    overflow: 'hidden',
  }
}))

const Chat = ({
  user,
  table,
  messages,
  onTableMessage,
  classes
}) => (
  <div className={classes.container}>
    <div id={`table-${table.id}-game-chat`} className={classes.messages}>
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

export default withStyles(styleSheet)(Chat)