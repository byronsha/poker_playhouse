// @flow
import * as React from 'react'
import { css } from 'emotion'
import Card from '../Game/Pieces/Card'

const flex = css`
  display: flex;
  align-items: center;
`
const cell = css`min-width: 150px;`
const seatNumber = css`color: white;`
const stepContainer = css`
  display: flex;
  margin: 8px 0;
  padding: 4px;
  background: #eee;
  border-radius: 4px;
`
const handNumber = css`
  text-transform: uppercase;
  color: white;
  font-size: 20px;
`

type Props = {
  hand: {
    id: string,
    createdAt: string,
    history: string,
  },
  onBackClick: () => void,
}
class Hand extends React.Component<Props> {
  renderHands(hand: { history: string }) {
    const history = JSON.parse(hand.history)
    const seats = Object.keys(history[0].seats).map(id => history[0].seats[id]).filter(seat => seat != null)
    const step = history[0]

    return (
      <div className={flex}>
        {seats.map(seat => (
          <div key={seat.id} className={css`display: flex; padding: 4px 24px 4px 0px;`}>
            <div className={seatNumber}>
              <span>Seat {seat.id} {step.button === seat.id ? '(D)' : ''}</span><br/>
              <span>${seat.stack}</span>
            </div>
            <Card card={seat.hand[0]} small />
            <Card card={seat.hand[1]} small />
          </div>
        ))}
      </div>
    )
  }

  renderStep(step: any) {
    return (
      <div>
        <div className={stepContainer}>
          <div className={flex}>
            {Object.keys(step.seats).map(id => step.seats[id]).filter(seat => seat != null).map(seat => (
              <div key={seat.id} className={cell}>
                <div>Seat {seat.id} {seat.lastAction ? `(${seat.lastAction})` : ''}</div>
                <div>Bet: ${seat.bet}</div>
                <div>Stack: ${seat.stack}</div>
              </div>
            ))}
          </div>
          <div className={flex}>
            <div className={cell}>
              Main pot: ${step.mainPot}<br />
              Total pot: ${step.pot}
              {step.sidePots.length > 0 &&
                <div>Side pots: [{step.sidePots.map(p => `$${p.amount}`).join(', ')}]</div>
              }
            </div>
            <div>{step.board.map((card, index) => <Card key={index} card={card} small />)}</div>
          </div>
        </div>
        {step.winMessages.length > 0 && (
          <div className={css`color: white;`}>
            Winners:
            {step.winMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { hand } = this.props
    const history = JSON.parse(hand.history)

    return (
      <div key={hand.id} style={{ margin: '24px' }}>
        <p className={css`color: #ccc;`} onClick={this.props.onBackClick}>{`<- Back to hand history`}</p>
        <p className={handNumber}>Hand #{hand.id} - {new Date(hand.createdAt).toDateString()}</p>
        {this.renderHands(hand)}
        {history.slice(1).map((step, index) => (
          <div key={index}>{this.renderStep(step)}</div>
        ))}
      </div>
    )
  }
}

export default Hand