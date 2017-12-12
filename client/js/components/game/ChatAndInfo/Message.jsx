import React from 'react'

const styles = {
  timeStamp: {
    color: '#ccc',
  },
}

const Message = ({ message }) => (
  <div>
    <span style={styles.timeStamp}>{message.timestamp}</span>
    {message.from &&
      <span> [{message.from}]</span>
    }
    <span>: {message.message}</span>
  </div>
)

export default Message