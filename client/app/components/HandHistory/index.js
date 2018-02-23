// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import { fetchHandHistory } from '../../actions/hands'
import Hand from './Hand'

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

  render() {
    const { hands } = this.props;
    return (
      <div>
        {hands.length > 0 && hands.map(hand => <Hand key={hand.id} hand={hand} />)}
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
