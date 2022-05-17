// @flow
import * as React from 'react'
import { css } from 'emotion'

import { Modal, Panel, Button, Text, UserSearchModal } from 'app/components';

const container = css`
  width: calc(100% - 470px);
`;

type Props = {
  group: any,
  deleteGroup: (groupId: number) => void,
}
type State = {
  confirmModalOpen: boolean,
  inviteModalOpen: boolean,
}
class Group extends React.Component<Props, State> {
  state = {
    confirmModalOpen: false,
    inviteModalOpen: false,
  }

  toggleConfirm = () => {
    this.setState({ confirmModalOpen: !this.state.confirmModalOpen })
  }

  toggleInvite = () => {
    this.setState({ inviteModalOpen: !this.state.inviteModalOpen })
  }

  handleDeleteClick = () => {
    this.props.deleteGroup(this.props.group.id);
    this.toggleConfirm();
  }

  createInvites = data => {
    console.log(data);
  }

  render() {
    const { group } = this.props;

    return (
      <div className={container}>
        <Panel header={group.name}>
          <div className={css`margin-bottom: 32px;`}>
            <div>
              Search code:<br />
              <Text bold>{group.code}</Text>
            </div>
          </div>
          <div className={css`text-align: right;`}>
            <Button onClick={this.toggleInvite} style={{ marginRight: '8px' }}>
              Invite a user
            </Button>
            <Button secondary onClick={this.toggleConfirm}>
              Delete this group
            </Button>
          </div>
        </Panel>
        <Modal open={this.state.confirmModalOpen}>
          <h2 className={css`margin: 0 0 32px;`}>
            Are you sure you want to delete group: {group.name}?
          </h2>
          <div className={css`text-align: right;`}>
            <Button
              onClick={this.toggleConfirm}
              style={{ marginRight: '8px' }}
            >
              Cancel
            </Button>
            <Button secondary onClick={this.handleDeleteClick}>
              Yes, delete group
            </Button>
          </div>
        </Modal>
        <UserSearchModal
          open={this.state.inviteModalOpen}
          header={`Invite a user to group... "${group.name}"`}
          closeModal={this.toggleInvite}
          onSubmit={this.createInvites}
        />
      </div>
    )
  }
}

export default Group