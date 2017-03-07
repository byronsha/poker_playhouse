import React from 'react'

class PlayerList extends React.Component {
  render() {
    const { players } = this.props

    if (Object.keys(players).length > 0) {
      return (
        <div>
          <h1>Players</h1>
          <ul>
            {Object.keys(players).map((id) => {
              return <li key={id}>{players[id].name}</li>
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