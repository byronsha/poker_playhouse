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

  handleRaiseUpdate(amount) {
    const { table } = this.props
    const seat = this.findOwnSeat()
    let newRaiseAmount = amount

    if (amount < table.minRaise) {
      newRaiseAmount = table.minRaise
    } else if (amount > seat.stack) {
      newRaiseAmount = seat.stack
    }

    this.setState({ raiseAmount: newRaiseAmount })
  }

  findOwnSeat() {
    const { player, table } = this.props
    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.socketId === player.socketId
    )[0]

    return seat
  }

  render() {
    const { player, table, onRaiseClick, onCheckClick,
            onCallClick, onFoldClick } = this.props

    const seat = this.findOwnSeat()
    const totalCallAmount = table.callAmount - seat.bet > seat.stack ? seat.stack : table.callAmount - seat.bet

    let pot = table.pot
    if (table.callAmount) {
      pot = table.pot * 2 + totalCallAmount
    }

    return (
      <div className="actions-container">
        <div className="actions">
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
              Call
              <br/>
              ${(totalCallAmount).toFixed(2)}
            </button>  
          }

          {seat.stack > table.callAmount &&
            <div className="raise-button">
              <button onClick={() => {
                onRaiseClick(table.id, parseFloat(this.state.raiseAmount))
              }}>
                Raise to
                <br/>
                ${parseFloat(this.state.raiseAmount).toFixed(2)}
              </button>

              <div className="raise-sizing-container">
                <button onClick={() => {
                  this.handleRaiseUpdate((pot/2).toFixed(2))
                }}>
                  ½ pot
                </button>

                <button onClick={() => {
                  this.handleRaiseUpdate((pot*(2/3)).toFixed(2))
                }}>
                  ⅔ pot
                </button>

                <button onClick={() => {
                  this.handleRaiseUpdate((pot*(3/4)).toFixed(2))
                }}>
                  ¾ pot
                </button>

                <button onClick={() => {
                  this.handleRaiseUpdate(pot)
                }}>
                  Pot
                </button>

                <RaiseSlider
                  raiseAmount={this.state.raiseAmount}
                  decreaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount - table.minBet)}
                  increaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount + table.minBet)}
                  onRaiseChange={this.handleRaiseChange}
                  table={table}
                  seat={seat}
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ActionButtons
