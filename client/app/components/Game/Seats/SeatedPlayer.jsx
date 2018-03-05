// @flow
import React from 'react'
import Hand from './Hand'
import ShotClock from './ShotClock'
import Bet from './Bet'
import Paper from 'material-ui/Paper'
import { blueGrey, cyan } from 'material-ui/styles/colors'

type Props = {
  user: {
    username: string,
  },
  seat: {
    id: number,
    hand: Array<{
      rank: string,
      suit: string,
    }>,
    bet: number,
    stack: number,
    player: {
      name: string,
    },
  },
  isButton: boolean,
}
class SeatedPlayer extends React.Component<Props> {
  render() {
    const { user, seat, isButton } = this.props

    return (
      <div>
        {seat.bet > 0 && <Bet seat={seat} />}
        
        {seat.hand.length > 0 && 
          <Hand seat={seat} />  
        }

        <Paper className="seat-info" style={{ borderRadius: '4px' }}>
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
              {isButton && <span className="button-chip">D</span>}
            </div>
          </div>

          {seat.turn && <ShotClock seconds={30} />}
        </Paper>
      </div>
    )
  }
}

export default SeatedPlayer
