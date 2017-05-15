import React from 'react'
import Hand from './Hand'
import ChipPile from '../pieces/ChipPile'
import ShotClock from './ShotClock'

class SeatedPlayer extends React.Component {
  render() {
    const { user, seat, isButton } = this.props

    return (
      <div>
        {seat.bet > 0 &&
          <div className="bet">
            <ChipPile amount={seat.bet} />
            <span>${seat.bet.toFixed(2)}</span>
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
            <div className="seat-player">{seat.player.name} {user.username === seat.player.name ? '(me)' : ''} </div>
          </div>
        </div>

        {seat.lastAction && !seat.turn &&
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
