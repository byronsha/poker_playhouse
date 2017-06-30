import React from 'react'
import Hand from './Hand'
import ShotClock from './ShotClock'
import Bet from './Bet'
import Paper from 'material-ui/Paper'
import { blueGrey, cyan } from 'material-ui/styles/colors'

class SeatedPlayer extends React.Component {
  render() {
    const { user, seat, isButton } = this.props

    return (
      <div>
        {seat.bet > 0 && <Bet seat={seat} />}
        
        {seat.hand.length > 0 && 
          <Hand seat={seat} />  
        }

        <Paper className="seat-info">
          <div className="seat-stack" style={{background: blueGrey[900]}}>
            ${seat.stack.toFixed(2)}
          </div>
          
          <div>
            <div className="seat-number" style={{background: cyan[600]}}>
              {seat.id}
            </div>
            <div className="seat-player" style={{background: cyan[900]}}>
              {seat.player.name} 
              {user.username === seat.player.name ? ' (me)' : ''}
            </div>
          </div>

          {seat.turn && <ShotClock seconds={30} />}
        </Paper>

        {isButton && <span className="button-chip">D</span>}
      </div>
    )
  }
}

export default SeatedPlayer
