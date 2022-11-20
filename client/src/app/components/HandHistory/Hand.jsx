// @flow
import * as React from 'react'
import { css } from 'emotion'
import Card from '../Game/Pieces/Card'
import theme from '../../../modules/utils/theme';

const flex = css`
  display: flex;
  align-items: center;
`
const handStyle = css`
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;
const linkStyle = css`
  &:hover {
    cursor: pointer;
    color: ${theme.colors.blue};
  }
`;
const cell = css`min-width: 150px;`
const stepContainer = css`
  display: inline-flex;
  margin: 4px 0;
  padding: 6px;
  background: #eee;
  border-radius: 4px;
`
const handNumber = css`
  text-transform: uppercase;
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
      <div className={css`${flex} margin-bottom: 20px;`}>
        {seats.map(seat => (
          <div key={seat.id} className={css`display: flex; padding: 4px 24px 4px 0px;`}>
            <div>
              <span><strong>Seat {seat.id} {step.button === seat.id ? '(D)' : ''}</strong></span><br/>
              <span>${seat.stack.toFixed(2)}</span>
              {seat.player.username &&
                <div className={css`font-size: 10px;`}>{seat.player.username}</div>
              }
            </div>
            <Card card={seat.hand[0]} small />
            <Card card={seat.hand[1]} small />
          </div>
        ))}
      </div>
    )
  }

  renderStep(step: any, renderBoard: boolean) {
    const realSidePots = step.sidePots.filter(pot => pot.amount > 0)

    return (
      <div>
        {renderBoard &&
          <div className={css`margin: 8px 0;`}>{step.board.map((card, index) => <Card key={index} card={card} small />)}</div>
        }
        <div className={stepContainer}>
          <div className={flex}>
            {Object.keys(step.seats).map(id => step.seats[id]).filter(seat => seat != null).map(seat => (
              <div key={seat.id} className={cell}>
                <div className={css`margin-bottom: 2px;`}><strong>Seat {seat.id}</strong> {seat.lastAction ? `(${seat.lastAction})` : ''}</div>
                <div>Bet: ${seat.bet.toFixed(2)}</div>
                <div>Stack: ${seat.stack.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className={flex}>
            <div className={css`min-width: 140px;`}>
              Main pot: ${step.mainPot.toFixed(2)}<br />
              Total pot: ${step.pot.toFixed(2)}
              {realSidePots.length > 0 &&
                <div>Side pots: [{realSidePots.map(p => `$${p.amount.toFixed(2)}`).join(', ')}]</div>
              }
            </div>
          </div>
        </div>
        {step.winMessages.length > 0 && (
          <div className={css`margin: 20px 0;`}>
            Winner:
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

    let lastDealt = -1;
    let dealt = -1;

    return (
      <div key={hand.id} className={handStyle}>
        <div onClick={this.props.onBackClick} className={linkStyle}>
          {`<- Back to hand history`}
        </div>
        <p className={handNumber}>
          Hand #{hand.id} - {new Date(hand.createdAt).toDateString()}
        </p>
        {this.renderHands(hand)}
        {history.slice(1).map((step, index) => {
          lastDealt = dealt;
          dealt = step.board.length;
          const showStreetName = lastDealt !== dealt;

          return (
            <div key={index}>
              {showStreetName && (
                <div className={css`margin-top: 20px; text-decoration: underline;`}>
                  {(dealt === 0) && 'Preflop'}
                  {(dealt === 3) && 'Flop'}
                  {(dealt === 4) && 'Turn'}
                  {(dealt === 5) && 'River'}
                </div>
              )}
              {this.renderStep(step, showStreetName)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Hand