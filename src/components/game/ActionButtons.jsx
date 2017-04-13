import React from 'react'
import RaiseSlider from './RaiseSlider'

class ActionButtons extends React.Component {
  constructor(props) {
    super(props)

    const { player, table } = this.props
    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]
    
    const raiseAmount = table.minRaise > seat.stack + seat.bet ?
      seat.stack + seat.bet : table.minRaise

    this.state = {
      raiseAmount: raiseAmount
    }

    this.handleRaiseChange = this.handleRaiseChange.bind(this)
  }

  handleRaiseChange(e) {
    this.setState({ raiseAmount: e.target.value })
  }

  render() {
    const { player, table, onRaiseClick, onCheckClick,
            onCallClick, onFoldClick } = this.props

    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]

    const totalCallAmount = table.callAmount - seat.bet > seat.stack ? seat.stack : table.callAmount - seat.bet

    return (
      <div className="action-buttons">
        <button onClick={() => {
          onFoldClick(table.id)
        }}>
          Fold
        </button>

        {(!table.callAmount || seat.bet === table.callAmount) &&
          <button onClick={() => {
            onCheckClick(table.id)
          }}>
            Check
          </button>
        }

        {(table.callAmount > 0 && seat.bet !== table.callAmount) &&
          <button onClick={() => {
            onCallClick(table.id)
          }}>
            Call - ${(totalCallAmount).toFixed(2)}
          </button>  
        }

        {seat.stack > table.callAmount &&
          <span>
            <button onClick={() => {
              onRaiseClick(table.id, parseFloat(this.state.raiseAmount))
            }}>
              Raise to ${parseFloat(this.state.raiseAmount).toFixed(2)}
            </button>

            <RaiseSlider
              raiseAmount={this.state.raiseAmount}
              onRaiseChange={this.handleRaiseChange}
              table={table}
              seat={seat}
            />
          </span>
        }
      </div>
    )
  }
}

export default ActionButtons
