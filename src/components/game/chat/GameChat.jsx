import React from 'react'
import Message from './Message'

const GameChat = ({ tableId, messages, onTableMessage}) => (
  <div className="game-chat-container">
    <div id={`table-${tableId}-game-chat`} className="game-chat">
      {messages.map((message, index) =>
        <Message key={message.timestamp + index} message={message} />
      )}
    </div>

    <input
      type="text"
      onKeyUp={onTableMessage}
    />
  </div>
)

export default GameChat