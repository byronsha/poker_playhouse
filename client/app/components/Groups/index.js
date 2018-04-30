// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { fetchGroups, createGroup, deleteGroup } from '../../actions/groups'

import { Panel, Text, Button } from 'app/components';
import Group from './Group';
import CreateGroupModal from './CreateGroupModal';

const container = css`
  display: flex;
  height: calc(100% - 168px);
  padding: 80px 20px;
`;
const leftColumn = css`
  width: 25%;
  margin-right: 20px;
`;
const groupList = css`
  position: relative;
  height: calc(50% - 12px);
  margin-bottom: 20px;
`;
const inviteList = css`
  position: relative;
  height: calc(50% - 12px);
`;
const groupName = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const button = {
  position: 'absolute',
  bottom: '16px',
  right: '24px',
};

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
  createGroup: (token: ?string, groupAttrs: any) => void,
  deleteGroup: (token: ?string, groupId: number) => void,
}
type State = {
  activeGroup: ?GroupType,
  modalOpen: boolean,
}
class Groups extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state ={
      activeGroup: null,
      modalOpen: false,
    }
  }

  componentDidMount() {
    this.props.fetchGroups(this.props.token)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.activeGroup && !nextProps.groups.find(group =>
      this.state.activeGroup && group.id === this.state.activeGroup.id
    )) {
      this.setState({ activeGroup: null })
    }
  }

  handleGroupClick = group => (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.setState({ activeGroup: group })
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  createGroup = groupAttrs => {
    this.props.createGroup(this.props.token, groupAttrs)
    this.toggleModal();
  }

  deleteGroup = groupId => {
    this.props.deleteGroup(this.props.token, groupId);
  }

  render() {
    const { activeGroup } = this.state;

    return (
      <div className={container}>
        <div className={leftColumn}>
          <Panel dark className={groupList} header="Groups">
            {this.props.groups.map(group => {
              const members = group.GroupMembers.length;
              const isActive = activeGroup && group.id === activeGroup.id;
              return (
                <div key={group.id} onClick={this.handleGroupClick(group)} className={groupName}>
                  <Text large bold={isActive}>{group.name}</Text>
                  <Text small bold={isActive}>({members} {members === 1 ? 'member' : 'members'})</Text>
                </div>
              );
            })}
            <Button onClick={this.toggleModal} style={button}>
              Create a new group
            </Button>
          </Panel>
          <Panel dark className={inviteList} header="Invites">
          </Panel>
        </div>
        {activeGroup && (
          <Group group={activeGroup} deleteGroup={this.deleteGroup} />
        )}
        <CreateGroupModal
          open={this.state.modalOpen}
          createGroup={this.createGroup}
          closeModal={this.toggleModal}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    isFetching: state.groups.isFetching,
    isCreating: state.groups.isCreating,
    errorMessage: state.groups.errorMessage,
    token: state.user.token,
  }
}

const mapDispatchToProps = ({
  fetchGroups,
  createGroup,
  deleteGroup,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups)
