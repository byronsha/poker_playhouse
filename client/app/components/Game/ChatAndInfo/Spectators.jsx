// @flow
import React from 'react'
import Player from '../../Lobby/MainMenu/Player'

const styles = {
  playerList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}

type Props = {
  user: {
    username: string,
  },
  table: {
    players: Array<{
      name: string,
      socketId: string,
    }>,
  },
}
class Spectators extends React.Component<Props> {
  render() {
    const { user, table } = this.props

    if (table.players.length > 0) {
      return (
        <div style={{ padding: '8px' }}>
          <ul style={styles.playerList}>
            {table.players.map(player => {
              let active = user.username === player.name ? true : false

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
