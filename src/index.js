import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import Chat from './components/Chat'

class App extends React.Component {
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

  createMessage = event => {
    const body = event.target.value

    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      event.target.value = ''
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

ReactDOM.render(<App />, document.getElementById('root'))
