import React from 'react'
import Message from './Message'

const GameChat = ({ playerName, tableId, messages, onTableMessage}) => (
  <div className="game-chat-container">
    <div id={`table-${tableId}-game-chat`} className="game-chat">
      {messages.map((message, index) =>
        <Message key={message.timestamp + index} message={message} />
      )}
    </div>

    <div>
      <div className="player-name">[{playerName}]: </div>
      <div className="game-chat-input">
        <input onKeyUp={onTableMessage} type="text" placeholder="..." />
      </div>
    </div>
  </div>
)

export default GameChat