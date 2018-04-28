// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchGroups } from '../../actions/groups'

import { Text } from 'app/components';
import Group from './Group';

const container = css`
  display: flex;
  padding: 80px 20px;
`;
const groupList = css`
  width: 500px;
`;
const groupName = css`
  margin-bottom: 10px;
`;

type GroupType = {
  id: number,
  name: string,
  GroupMembers: Array<Object>,
}
type Props = {
  groups: Array<GroupType>,
  isFetching: boolean,
  errorMessage: ?string,
  token: ?string,
  fetchGroups: (token: ?string) => void,
}
type State = {
  activeGroup: ?GroupType,
}
class Groups extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state ={
      activeGroup: null,
    }
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.token)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groups && nextProps.groups[0]) {
      this.setState({ activeGroup: nextProps.groups[0] })
    }
  }

  handleGroupClick = group => (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.setState({ activeGroup: group })
  }

  render() {
    return (
      <div className={container}>
        <div className={groupList}>
          {this.props.groups.map(group => {
            const members = group.GroupMembers.length;
            return (
              <div key={group.id} onClick={this.handleGroupClick(group)} className={groupName}>
                <Text large>{group.name}</Text>
                <Text small> ({members} {members === 1 ? 'member' : 'members'})</Text>
              </div>
            );
          })}
        </div>
        {this.state.activeGroup && (
          <Group group={this.state.activeGroup} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    isFetching: state.groups.isFetching,
    errorMessage: state.groups.errorMessage,
    token: state.user.token,
  }
}

const mapDispatchToProps = ({
  fetchGroups
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
