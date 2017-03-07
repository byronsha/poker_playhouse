import React from 'react'

class Players extends React.Component {
  render() {
    const { table } = this.props

    if (table.players.length > 0) {
      return (
        <div>
          <ul>
            {table.players.map((player) => {
              return <li key={player.socketId}>{player.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Players
