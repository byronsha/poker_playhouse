// @flow
import * as React from 'react'
import { css } from 'emotion'
import Card from '../Game/Pieces/Card'

const flex = css`
  display: flex;
  align-items: center;
`
const cell = css`min-width: 150px;`

type Props = {
  hand: {
    id: string,
    createdAt: string,
    history: any,
  },
}
class Hand extends React.Component<Props> {
  getPlayerHands(hand) {
    const history = JSON.parse(hand.history)
    const seats = Object.keys(history[0].seats).map(id => history[0].seats[id]).filter(seat => seat != null)

    return (
      <div className={flex}>
        {seats.map(seat => (
          <div key={seat.id} className={css`padding: 0 24px;`}>
            <h3>{seat.id}</h3>
            <Card card={seat.hand[0]} />
            <Card card={seat.hand[1]} />
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { hand } = this.props

    return (
      <div key={hand.id} style={{ margin: '24px' }}>
        <h4>#{hand.id} - {new Date(hand.createdAt).toDateString()}</h4>
        {this.getPlayerHands(hand)}
        {JSON.parse(hand.history).map((step, index) => (
          <div key={index} style={{ margin: '12px', padding: '12px', border: '1px solid #ccc' }}>
            <div className={flex}>
              <div className={cell}>Main pot:{step.mainPot}</div>
              <div className={cell}>Pot: {step.pot}</div>
              <div>Board: {step.board.map((card, index) => <Card key={index} card={card} />)}</div>
            </div>
            <div className={flex}>
              {Object.keys(step.seats).map(id => step.seats[id]).filter(seat => seat != null).map(seat => (
                <div key={seat.id} className={flex}>
                  <div className={cell}>Seat {seat.id}</div>
                  <div className={cell}>Bet: ${seat.bet}</div>
                  <div className={cell}>Stack: ${seat.stack}</div>
                </div>
              ))}
            </div>
            {step.winMessages.length > 0 &&
              <div>Winner: {step.winMessages}</div>
            }
          </div>
        ))}
      </div>
    )
  }
}

export default Hand