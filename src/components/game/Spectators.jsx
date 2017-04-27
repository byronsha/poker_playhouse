import React from 'react'
import Player from '../right_column/Player'

class Spectators extends React.Component {
  render() {
    const { player, table } = this.props

    if (table.players.length > 0) {
      return (
        <div>
          <ul className="player-list">
            {table.players.map((tablePlayer) => {
              let active = player.socketId === tablePlayer.socketId ? true : false

              return (
                <Player
                  key={tablePlayer.socketId}
                  player={tablePlayer}
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
