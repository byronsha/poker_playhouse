import React from 'react'

class ActionButtons extends React.Component {
  render() {
    let raiseAmount
    const { player, table, onRaiseClick, onCheckClick,
            onCallClick, onFoldClick } = this.props

    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]

    return (
      <div>
        <button onClick={() => {
          onFoldClick(table.id)
        }}>
          Fold
        </button>

        {table.callAmount === 0 &&
          <button onClick={() => {
            onCheckClick(table.id)
          }}>
            Check
          </button>
        }

        {table.callAmount > 0 &&
          <button onClick={() => {
            onCallClick(table.id)
          }}>
            Call - ${table.callAmount - seat.bet}
          </button>  
        }

        <button onClick={() => {
          onRaiseClick(table.id, parseFloat(raiseAmount.value))
        }}>
          Raise
        </button>

        <input
          type="number"
          ref={ref => { raiseAmount = ref }}
        >
        </input>
      </div>
    )
  }
}

export default ActionButtons