import React from 'react'

class ActionButtons extends React.Component {
  render() {
    const { player, table } = this.props
    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]

    return (
      <div>
        <button>Fold</button>

        {table.callAmount === 0 &&
          <button>Check</button>
        }

        {table.callAmount > 0 &&
          <button>Call - {table.callAmount - seat.bet}</button>  
        }

        <button>Bet</button>
      </div>
    )
  }
}

export default ActionButtons