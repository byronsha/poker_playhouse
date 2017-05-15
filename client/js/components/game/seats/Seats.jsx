import React from 'react'
import SeatedPlayer from './SeatedPlayer'
import EmptySeat from './EmptySeat'

class Seats extends React.Component {
  render() {
    const { user, table, onSeatClick, displayOffset } = this.props
    let seats = Object.keys(table.seats)

    let seated = false
    for (let i = 0; i < Object.values(table.seats).length; i++) {
      let seat = Object.values(table.seats)[i]
      if (seat && seat.player.name === user.username) {
        seated = true
      }
    }

    return (
      <div>
        {seats.map((seatId) => {
          const seat = table.seats[seatId]
          const isButton = parseInt(seatId) === table.button ? true : false

          let displayOrder
          if (parseInt(seatId) + displayOffset > table.maxPlayers) {
            displayOrder = parseInt(seatId) + displayOffset - table.maxPlayers
          } else {
            displayOrder = parseInt(seatId) + displayOffset
          }

          let className = `seat-container seat${displayOrder}of${table.maxPlayers}`
          if (seat && seat.turn) {
            className += ' active'
          }

          if (seat) {
            return (
              <div key={seatId} className={className}>
                <SeatedPlayer
                  user={user}
                  seat={seat}
                  isButton={isButton}
                />
              </div>
            )
          } else if (!seated) {
            return (
              <div key={seatId} className={className}>
                <EmptySeat
                  seatId={seatId}
                  onSeatClick={e => {
                    e.stopPropagation()
                    onSeatClick(table.id, parseInt(seatId))
                }}/>
              </div>
            )
          } else {
            return <div key={seatId}></div>
          }
        })}
      </div>
    )
  }
}

export default Seats
