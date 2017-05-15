import React from 'react'
import Player from '../right_column/Player'

class Spectators extends React.Component {
  render() {
    const { user, table } = this.props

    if (table.players.length > 0) {
      return (
        <div>
          <ul className="player-list">
            {table.players.map(player => {
              let active = user.userame === player.name ? true : false

              return (
                <Player
                  key={player.socketId}
                  player={player}
                  active={active}
                />
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Spectators
