import React from 'react'
import Player from '../lobby/Player'

class Players extends React.Component {
  render() {
    const { player, table } = this.props

    if (table.players.length > 0) {
      return (
        <div>
          <ul>
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

export default Players
