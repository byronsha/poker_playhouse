import React from 'react'

class Seats extends React.Component {
  render() {
    const { table, onSeatClick } = this.props

    return (
      <div>
        {Object.keys(table.seats).map((seatId) => {
          const seat = table.seats[seatId]
          if (seat) {
            return <div key={seatId} className="seat">{seat.player.name} - {seat.stack}</div>
          } else {
            return (
              <div
                key={seatId}
                className="seat"
                onClick={() => { onSeatClick(table.id, seatId) }}
              >
                Sit here
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default Seats
