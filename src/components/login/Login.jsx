import React from 'react'
import io from 'socket.io-client'

class Login extends React.Component {
  componentDidMount() {
    this.socket = io('/')
    this.socket.on('lobby_joined', ({player, tables, players}) => {
      console.log(player.name + ' joined the lobby.')

      this.props.router.push({
        pathname: '/lobby',
        state: {player, tables, players}
      })
    })
  }
  
  handleSubmit = e => {
    e.preventDefault()
    this.socket.emit('join_lobby', this.playerName.value)
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="What's your name?"
            ref={ref => {this.playerName = ref}}
          />
          <input
            type="submit"
            value="Login"
          />
        </form>
      </div>
    )
  }
}

export default Login
