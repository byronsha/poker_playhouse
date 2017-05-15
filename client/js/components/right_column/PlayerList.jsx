import React from 'react'
import Player from './Player'

class PlayerList extends React.Component {
  render() {
    const { user, players } = this.props

    if (Object.keys(players).length > 0) {
      return (
        <div>
          <div>Lobby</div>
          <ul className="player-list">
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