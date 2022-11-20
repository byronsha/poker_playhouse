// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchHandHistory } from '../../actions/hands'
import Icon from 'material-ui/Icon'
import Hand from './Hand'
import { Panel, Button } from '../../../components';
import theme from '../../../modules/utils/theme';

const container = css`
  height: calc(100% - 170px);
  padding: 80px 20px;
`;
const link = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    color: ${theme.colors.blue};
  }
`;
const handList = css`
  position: relative;
  width: 450px;
  height: 100%;
`
const pagination = css`
  width: calc(100% - 48px);
  position: absolute;
  bottom: 16px;
  font-size: 12px;
  display: flex;
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
        <Panel dark header="Hand history" className={handList}>
          <div>
            {hands.length > 0 && hands.map(hand => (
              <div key={hand.id} className={link} onClick={() => this.setState({ hand })}>
                <span>Hand #{hand.id}</span>
                <span>{new Date(hand.createdAt).toUTCString()}</span>
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
        </Panel>
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
