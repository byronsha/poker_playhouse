import React from 'react'

class Seats extends React.Component {
  render() {
    const { table } = this.props

    return (
      <div>
        {Object.keys(table.seats).map((seatId) => {
          const seat = table.seats[seatId]
          if (seat) {
            return <div key={seatId} className="seat">{seat.player.name} - {seat.player.stack}</div>
          } else {
            return <div key={seatId} className="seat">Sit here</div>
          }
        })}
      </div>
    )
  }
}

export default Seats
