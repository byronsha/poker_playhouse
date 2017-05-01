import React from 'react'
import Hand from './Hand'
import ChipPile from '../pieces/ChipPile'
import ShotClock from './ShotClock'

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
          <div className="seat-stack">
            <div>${seat.stack.toFixed(2)}</div>
          </div>
          
          <div>
            <div className="seat-number">{seat.id}</div>
            <div>{seat.player.name} {player.socketId === seat.player.socketId ? '(me)' : ''} </div>
          </div>
        </div>

        {seat.lastAction &&
          <div className="seat-last-action">{seat.lastAction}</div>
        }

        {seat.turn &&
          <ShotClock seconds={30} /> 
        }

        {isButton && <span className="button-chip">D</span>}
      </div>
    )
  }
}

export default SeatedPlayer
