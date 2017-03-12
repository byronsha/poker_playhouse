import React from 'react'

class SeatedPlayer extends React.Component {
  render() {
    const { seat } = this.props
    const className = seat.turn ? 'seat active' : 'seat'

    return (
      <div className={className}>
        {seat.bet > 0 &&
          <div>{seat.bet}</div>  
        }
        
        <div>{seat.player.name} - {seat.stack}</div>
        
        {seat.hand.length > 0 && 
          <div>{seat.hand[0]} | {seat.hand[1]}</div>  
        }
      </div>
    )
  }
}

export default SeatedPlayer
