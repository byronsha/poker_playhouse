import React from 'react'
import RaiseSlider from './RaiseSlider'

class ActionButtons extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      raiseAmount: this.props.table.minRaise
    }

    this.handleRaiseChange = this.handleRaiseChange.bind(this)
  }

  handleRaiseChange(e) {
    this.setState({ raiseAmount: e.target.value })
  }

  render() {
    let raiseAmount
    const { player, table, onRaiseClick, onCheckClick,
            onCallClick, onFoldClick } = this.props

    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]

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
            Call - ${(table.callAmount - seat.bet).toFixed(2)}
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
