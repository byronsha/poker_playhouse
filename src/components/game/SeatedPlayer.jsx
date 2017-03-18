import React from 'react'
import Hand from './Hand'

class SeatedPlayer extends React.Component {
  render() {
    const { player, seat, isButton } = this.props
    const className = seat.turn ? 'seat active' : 'seat'

    return (
      <div className={className}>
        {seat.bet > 0 &&
          <div>${seat.bet.toFixed(2)}</div>  
        }
        
        <div>{seat.player.name} {player.socketId === seat.player.socketId ? '(me)' : ''}</div>
        <div>${seat.stack.toFixed(2)}</div>
        
        {seat.hand.length > 0 && 
          <Hand seat={seat} />  
        }

        <div>seat {seat.id}</div>
        {isButton && <div>btn</div>}
      </div>
    )
  }
}

export default SeatedPlayer
