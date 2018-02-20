// @flow
import React from 'react'

const styles = {
  timeStamp: {
    color: '#ccc',
  },
}

const Message = ({ message }: { message: string }) => (
  <div>
    <span style={styles.timeStamp}>{message.timestamp}</span>
    {message.from &&
      <span> [{message.from}]</span>
    }
    <span>: {message.message}</span>
  </div>
)

export default Message