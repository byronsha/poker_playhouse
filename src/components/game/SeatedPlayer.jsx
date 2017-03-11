import React from 'react'

class SeatedPlayer extends React.Component {
  render() {
    const { seat } = this.props

    return (
      <div className="seat">
        <div>{seat.player.name} - {seat.stack}</div>
        {seat.hand.length > 0 && 
          <div>{seat.hand[0]} | {seat.hand[1]}</div>  
        }
      </div>
    )
  }
}

export default SeatedPlayer
