// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchHandHistory } from '../../actions/hands'
import Icon from 'material-ui/Icon'
import Hand from './Hand'
import { Button } from 'app/components';

const container = css`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 75px 20px 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const link = css`
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const pagination = css`
  font-size: 12px;
  display: flex;
  width: 350px;
  justify-content: space-between;
  align-items: center;
`;
const paginationButton = {
  padding: '2px 4px',
}

type Props = {
  hands: Array<Object>,
  pages: number,
  count: number,
  fetchHandHistory: (token: ?string, page: number) => void,
  isFetching: boolean,
  errorMessage: ?string,
  token: ?string,
}
type State = {
  hand: ?Object,
  page: number,
}
class HandHistory extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      hand: null,
      page: 1,
    }
  }

  componentDidMount() {
    this.props.fetchHandHistory(this.props.token, 1)
  }

  previousPage = () => {
    if (this.state.page === 1) return
    const prevPage = this.state.page - 1
    this.setState({ page: prevPage })
    this.props.fetchHandHistory(this.props.token, prevPage)    
  }

  nextPage = () => {
    if (this.state.page === this.props.pages) return
    const nextPage = this.state.page + 1
    this.setState({ page: nextPage })
    this.props.fetchHandHistory(this.props.token, nextPage)
  }

  handleBackClick = () => {
    this.setState({ hand: null })
  }

  render() {
    const { hands, pages } = this.props;

    if (this.state.hand) {
      return (
        <div className={container}>
          <Hand hand={this.state.hand} onBackClick={this.handleBackClick} />
        </div>
      )
    }

    return (
      <div className={container}>
        <div className={css`min-height: 350px;`}>
          {hands.length > 0 && hands.map(hand => (
            <div key={hand.id} className={link} onClick={() => this.setState({ hand })}>
              Hand #{hand.id} - {new Date(hand.createdAt).toUTCString()}
            </div>
          ))}
        </div>
        <div className={pagination}>
          <Button
            flat
            onClick={this.previousPage}
            style={paginationButton}
            disabled={this.state.page === 1}
          >
            <Icon>fast_rewind</Icon>
          </Button>
          <div className={css`margin: 0 5px;`}>
            Page: {this.state.page} / {this.props.pages}{' '}
            ({this.props.count} hands)
          </div>
          <Button
            flat
            onClick={this.nextPage}
            style={paginationButton}
            disabled={this.state.page === pages}
          >
            <Icon>fast_forward</Icon>
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    hands: state.hands.hands,
    pages: state.hands.pages,
    count: state.hands.count,
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
