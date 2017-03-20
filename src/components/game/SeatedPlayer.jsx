import React from 'react'
import Hand from './Hand'

class SeatedPlayer extends React.Component {
  render() {
    const { player, seat, isButton } = this.props
    const className = seat.turn ? 'seat active' : 'seat'

    return (
      <div className="seated-player">
        {seat.bet > 0 &&
          <div>${seat.bet.toFixed(2)}</div>  
        }
        
        {seat.hand.length > 0 && 
          <Hand seat={seat} />  
        }

        <div className={className}>
          <span className="seat-number">{seat.id}</span>
          <span>{seat.player.name} {player.socketId === seat.player.socketId ? '(me)' : ''} </span>
          <span> ${seat.stack.toFixed(2)}</span>
        </div>

        {isButton && <span className="button">B</span>}
      </div>
    )
  }
}

export default SeatedPlayer
