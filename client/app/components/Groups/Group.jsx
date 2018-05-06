// @flow
import * as React from 'react'
import { css } from 'emotion'

import { Modal, Panel, Button, Text } from 'app/components';

const container = css`
  width: calc(100% - 470px);
`;

type Props = {
  group: any,
  deleteGroup: (groupId: number) => void,
}
type State = {
  confirmOpen: boolean,
}
class Group extends React.Component<Props, State> {
  state = {
    confirmOpen: false,
  }

  toggleConfirm = () => {
    this.setState({ confirmOpen: !this.state.confirmOpen });
  }

  handleDeleteClick = () => {
    this.props.deleteGroup(this.props.group.id);
    this.toggleConfirm();
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
            <Button secondary onClick={this.toggleConfirm}>Delete this group</Button>
          </div>
        </Panel>
        <Modal open={this.state.confirmOpen}>
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
      </div>
    )
  }
}

export default Group