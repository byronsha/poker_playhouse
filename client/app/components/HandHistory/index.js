// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchHandHistory } from '../../actions/hands'
import Card from '../Game/Pieces/Card'

const flex = css`
  display: flex;
  align-items: center;
`

type Props = {
  hands: Array<Object>,
  fetchHandHistory: (token: ?string, page: number) => void,
  isFetching: boolean,
  errorMessage: ?string,
  token: ?string,
}
class HandHistory extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchHandHistory(this.props.token, 1)
  }

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
    const { hands } = this.props;

    return (
      <div>
        {hands.length > 0 && hands.map(hand => (
          <div key={hand.id} style={{ margin: '24px' }}>
            <h4>#{hand.id} - {new Date(hand.createdAt).toDateString()}</h4>
            {this.getPlayerHands(hand)}
            {JSON.parse(hand.history).map((step, index) => (
              <div key={index} style={{ margin: '12px', padding: '12px', border: '1px solid #ccc' }}>
                <div>Main pot:{step.mainPot}</div>
                <div>Pot: {step.pot}</div>
                <div>
                  Board: 
                  {step.board.map((card, index) => <Card key={index} card={card} />)}
                </div>
                <div className={flex}>
                  Seats:
                  {Object.keys(step.seats).map(id => step.seats[id]).filter(seat => seat != null).map(seat => (
                    <div key={seat.id} className={css`padding: 0 24px;`}>
                      <h4>{seat.id}</h4>
                      <div>Bet: {seat.bet}</div>
                      <div>Stack: {seat.stack}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hands: state.hands.hands,
    isFetching: state.hands.isFetching,
    errorMessage: state.hands.errorMessage,
    token: state.user.token,
  }
}

const mapDispatchToProps = ({
  fetchHandHistory
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandHistory)
