import React from 'react'
import RaiseSlider from './RaiseSlider'
import PotSizeButton from './PotSizeButton'

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
    const { table } = this.props
    if (e.target.value < table.minRaise || e.target.value > table.maxBet) {
      return
    }
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

    const potSizes = [
      ['½ pot', 1/2],
      ['⅔ pot', 2/3],
      ['¾ pot', 3/4],
      ['Pot', 1]
    ]

    return (
      <div className="actions-container">
        <div className="actions">
          <div className="main-action-buttons">
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
                Call ${(totalCallAmount).toFixed(2)}
              </button>  
            }

            {seat.stack > table.callAmount &&
              <button onClick={() => {
                onRaiseClick(table.id, parseFloat(this.state.raiseAmount))
              }}>
                Raise to ${parseFloat(this.state.raiseAmount).toFixed(2)}
              </button>
            }
          </div>

          {seat.stack > table.callAmount &&
            <div>
              <div className="raise-slider-container">
                <RaiseSlider
                  raiseAmount={this.state.raiseAmount}
                  decreaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount - table.minBet)}
                  increaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount + table.minBet)}
                  onRaiseChange={this.handleRaiseChange}
                  table={table}
                  seat={seat}
                />
                <input type="number" onChange={this.handleRaiseChange} />
              </div>

              <div className="raise-size-buttons">
                {potSizes.map(potSize =>
                  <PotSizeButton
                    key={potSize[0]}
                    text={potSize[0]}
                    onRaiseClick={() => this.handleRaiseUpdate(pot*potSize[1])}
                  />
                )}
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ActionButtons