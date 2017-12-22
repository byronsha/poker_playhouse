import React from 'react'
import Player from './Player'

const styles = {
  playerList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}

class PlayerList extends React.Component {
  render() {
    const { user, players } = this.props

    if (Object.keys(players).length > 0) {
      return (
        <div style={{ marginBottom: '20px' }}>
          <h3>Currently online</h3>
          <ul style={styles.playerList}>
            {Object.keys(players).map(id => {
              let active = user.username === players[id].name ? true : false

              return (
                <Player
                  key={id}
                  player={players[id]}
                  active={active}
                />
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <div><h1>Players</h1></div>
    }
  }
}

export default PlayerList