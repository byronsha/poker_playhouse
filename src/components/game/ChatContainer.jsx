import React from 'react'
import Chat from './Chat'
import io from 'socket.io-client'

class ChatContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { messages: [] }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })
  }

  createMessage = e => {
    const body = e.target.value

    if (e.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      e.target.value = ''
    }
  }

  render () {
    return (
      <div>
        <Chat
          messages={this.state.messages}
          createMessage={this.createMessage}
        />
      </div>
    )
  }
}

export default ChatContainer