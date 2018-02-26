// @flow
import React from 'react'

const styles = {
  timeStamp: {
    color: '#ccc',
  },
}

type Props = {
  message: {
    message: string,
    timestamp: string,
    from: string,
  },
}
const Message = ({ message }: Props) => (
  <div>
    <span style={styles.timeStamp}>{message.timestamp}</span>
    {message.from &&
      <span> [{message.from}]</span>
    }
    <span>: {message.message}</span>
  </div>
)

export default Message