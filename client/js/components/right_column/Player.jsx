import React from 'react'

class Player extends React.Component {
  render() {
    const { player, active } = this.props
    const style = {
      fontWeight: active ? 'bold' : 'normal'
    }

    return (
      <li style={style}>
        <span>{player.name}</span>
        {active && <span> (me)</span>}
      </li>
    )
  }
}

export default Player