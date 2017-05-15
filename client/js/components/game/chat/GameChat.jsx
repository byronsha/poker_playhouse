import React from 'react'
import Message from './Message'

const GameChat = ({ playerName, tableId, messages, onTableMessage}) => (
  <div className="game-chat">
    <div id={`table-${tableId}-game-chat`} className="messages">
      {messages.map((message, index) =>
        <Message key={message.timestamp + index} message={message} />
      )}
    </div>

    <div className="chat-input">
      <input onKeyUp={onTableMessage} type="text" placeholder="Message" />
    </div>
  </div>
)

export default GameChat