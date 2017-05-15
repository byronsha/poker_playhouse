import React from 'react'

const Message = ({ message }) => (
  <div>
    <span>{message.timestamp}: </span>
    {message.from &&
      <span><b>[{message.from}] </b></span>
    }
    <span>{message.message}</span>
  </div>
)

export default Message