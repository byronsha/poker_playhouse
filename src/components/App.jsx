import React from 'react'
import io from 'socket.io-client'

const socket = io('/')

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          socket
        })}
      </div>
    )
  }
}

export default App
