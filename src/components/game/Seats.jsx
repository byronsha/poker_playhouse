import React from 'react'
import SeatedPlayer from './SeatedPlayer'
import EmptySeat from './EmptySeat'

class Seats extends React.Component {
  render() {
    const { player, table, onSeatClick } = this.props

    return (
      <div>
        {Object.keys(table.seats).map((seatId) => {
          const seat = table.seats[seatId]
          const isButton = parseInt(seatId) === table.button ? true : false

          let className = `seat-container seat${seatId}of${table.maxPlayers}`
          if (seat && seat.turn) {
            className += ' active'
          }

          if (seat) {
            return (
              <div key={seatId} className={className}>
                <SeatedPlayer
                  player={player}
                  seat={seat}
                  isButton={isButton}
                />
              </div>
            )
          } else {
            return (
              <div key={seatId} className={className}>
                <EmptySeat
                  seatId={seatId}
                  onSeatClick={() => { onSeatClick(table.id, parseInt(seatId)) }}
                />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default Seats
