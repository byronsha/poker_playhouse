import React from 'react'
import RaiseSlider from './RaiseSlider'
import PotSizeButton from './PotSizeButton'
import ActionButtons from './ActionButtons'

import { blueGrey } from 'material-ui/styles/colors'

const styles = {
  container: {
    position: 'absolute',
    width: '580px',
    padding: '5px',
    left: '0',
    bottom: '0',
    backgroundColor: blueGrey[100],
    border: `1px solid ${blueGrey[100]}`
  },
}

class Actions extends React.Component {
  constructor(props) {
    super(props)

    const { user, table } = this.props
    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.name === user.username
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
    let newRaiseAmount = parseFloat(amount)

    if (amount < table.minRaise) {
      newRaiseAmount = table.minRaise
    } else if (amount > seat.stack + seat.bet) {
      newRaiseAmount = seat.stack + seat.bet
    }

    this.setState({ raiseAmount: newRaiseAmount })
  }

  findOwnSeat() {
    const { user, table } = this.props
    const seat = Object.values(table.seats).filter(seat =>
      seat !== null && seat.player.name === user.username
    )[0]

    return seat
  }

  render() {
    const {
      table,
      onRaiseClick,
      onCheckClick,
      onCallClick,
      onFoldClick
    } = this.props

    const seat = this.findOwnSeat()
    if (seat.sittingOut || table.handOver) return null;

    const totalCallAmount = table.callAmount - seat.bet > seat.stack ? seat.stack : table.callAmount - seat.bet

    let pot = table.pot
    if (table.callAmount) {
      pot = table.pot * 2 + totalCallAmount
    }

    const potSizes = [
      ['Min', table.minRaise],
      ['½ pot', pot * 1/2],
      ['⅔ pot', pot * 2/3],
      ['¾ pot', pot * 3/4],
      ['Pot', pot],
      ['All in', seat.bet + seat.stack]
    ]

    return (
      <div style={styles.container}>
        <ActionButtons
          seat={seat}
          table={table}
          raiseAmount={this.state.raiseAmount}
          totalCallAmount={totalCallAmount}
          handleFoldClick={() => onFoldClick(table.id)}
          handleCheckClick={() => onCheckClick(table.id)}
          handleCallClick={() => onCallClick(table.id)}
          handleRaiseClick={() => onRaiseClick(table.id, parseFloat(this.state.raiseAmount))}
        />

        {seat.stack > table.callAmount &&
          <RaiseSlider
            raiseAmount={this.state.raiseAmount}
            decreaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount - table.minBet)}
            increaseRaiseAmount={() => this.handleRaiseUpdate(this.state.raiseAmount + table.minBet)}
            onRaiseChange={this.handleRaiseChange}
            table={table}
            seat={seat}
          />
        }

        {seat.stack > table.callAmount &&
          <div style={{display: 'flex'}}>
            {potSizes.map(potSize =>
              <PotSizeButton
                key={potSize[0]}
                text={potSize[0]}
                onRaiseClick={() => this.handleRaiseUpdate(potSize[1])}
              />
            )}
          </div>
        }
      </div>
    )
  }
}

export default Actions