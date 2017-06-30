import React from 'react'
import Message from './Message'
import Paper from 'material-ui/Paper'

const GameChat = ({ playerName, tableId, messages, onTableMessage}) => (
  <Paper className="game-chat">
    <div id={`table-${tableId}-game-chat`} className="messages">
      {messages.map((message, index) =>
        <Message key={message.timestamp + index} message={message} />
      )}
    </div>

    <div className="chat-input">
      <input onKeyUp={onTableMessage} type="text" placeholder="Message" />
    </div>
  </Paper>
)

export default GameChat