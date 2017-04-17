import React from 'react'
import Hand from './Hand'
import ChipPile from './ChipPile'

class SeatedPlayer extends React.Component {
  render() {
    const { player, seat, isButton } = this.props

    return (
      <div>
        {seat.bet > 0 &&
          <div className="bet">
            <ChipPile amount={seat.bet.toFixed(2)} />
            ${seat.bet.toFixed(2)}
          </div>
        }
        
        {seat.hand.length > 0 && 
          <Hand seat={seat} />  
        }

        <div className="seat-info">
          <div className="seat-number">{seat.id}</div>
          <div className="seat-stack">
            <div>{seat.player.name} {player.socketId === seat.player.socketId ? '(me)' : ''} </div>
            <div> ${seat.stack.toFixed(2)}</div>
          </div>
        </div>

        {seat.lastAction && <div className="seat-last-action">{seat.lastAction}</div>}
        {isButton && <span className="button">D</span>}
      </div>
    )
  }
}

export default SeatedPlayer
