// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchHandHistory } from '../../actions/hands'
import Hand from './Hand'

const container = css`margin-top: 80px; margin-bottom: 160px;`

type Props = {
  hands: Array<Object>,
  fetchHandHistory: (token: ?string, page: number) => void,
  isFetching: boolean,
  errorMessage: ?string,
  token: ?string,
}
type State = {
  hand: ?Object,
}
class HandHistory extends React.Component<Props, State> {
  state = {
    hand: null,
  }

  componentDidMount() {
    this.props.fetchHandHistory(this.props.token, 1)
  }

  handleBackClick = () => {
    this.setState({ hand: null })
  }

  render() {
    const { hands } = this.props;

    if (this.state.hand) {
      return (
        <div className={container}>
          <Hand hand={this.state.hand} onBackClick={this.handleBackClick} />
        </div>
      )
    }

    return (
      <div className={container}>
        {hands.length > 0 && hands.map(hand => (
          <p
            key={hand.id}
            className={css`color: white; padding-left: 10px;`}
            onClick={() => this.setState({ hand })}
          >
            Hand #{hand.id} - {new Date(hand.createdAt).toUTCString()}
          </p>
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
