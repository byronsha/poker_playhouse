import React from 'react'
import SeatedPlayer from './SeatedPlayer'

class Seats extends React.Component {
  render() {
    const { player, table, onSeatClick } = this.props

    return (
      <div>
        {Object.keys(table.seats).map((seatId) => {
          const seat = table.seats[seatId]
          if (seat) {
            return <SeatedPlayer key={seatId} player={player} seat={seat} />
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
