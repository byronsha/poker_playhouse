import React from 'react'

class Lobby extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      player: this.props.location.state.player
    }
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
