import React from 'react'

class Login extends React.Component {
  componentDidMount() {
    const { socket } = this.props

    socket.on('lobby_joined', player => {
      this.props.router.push({
        pathname: '/lobby',
        state: { player }
      })
    })

    socket.emit('join_lobby', (0|Math.random()*9e6).toString(36))
  }
  
  handleSubmit = e => {
    e.preventDefault()
    
    const { socket } = this.props
    socket.emit('join_lobby', this.playerName.value)
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
