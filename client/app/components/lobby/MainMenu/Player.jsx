// @flow
import React from 'react'

type Props = {
  player: {
    name?: ?string,
  },
  active: boolean,
}
class Player extends React.Component<Props> {
  render() {
    const { player, active } = this.props
    const style = {
      fontWeight: active ? 'bold' : 'normal'
    }

    return (
      <li style={style}>
        <span>{player.name}</span>
        {active && <span> (you)</span>}
      </li>
    )
  }
}

export default Player