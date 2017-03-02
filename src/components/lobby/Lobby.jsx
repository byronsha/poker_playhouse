import React from 'react'
import io from 'socket.io-client'

class Lobby extends React.Component {
  constructor(props) {
    super(props)

    const locationState = this.props.location.state

    this.state = {
      player: locationState.player,
      tables: locationState.tables,
      players: locationState.players
    }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('table_created', table => {
      console.log(table)
    })
  }

  render() {
    return (
      <div>
        <h1>Lobby</h1>
      </div>
    )
  }
}

export default Lobby
