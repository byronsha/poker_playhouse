import * as React from 'react'
import { css } from 'emotion'

import Input from 'material-ui/Input';
import { Modal, Button } from 'app/components';

const buttons = css`
  text-align: right;
`;
const inputStyle = {
  width: '100%',
  fontSize: '20px',
  fontFamily: 'Montserrat, sans-serif',
  marginBottom: '32px',
};

type Props = {
  open: boolean,
  createGroup: (groupAttrs: Object) => void,
  closeModal: () => void,
};
class CreateGroupModal extends React.Component<Props> {
  handleSubmit = () => {
    this.props.createGroup({ name: this.groupName.value });
  };

  render() {
    return (
      <Modal open={this.props.open}>
        <h2 className={css`margin-top: 0;`}>What's the name of your group?</h2>
        <Input
          inputRef={ref => { this.groupName = ref }}
          type="text"
          style={inputStyle}
        />
        <div className={buttons}>
          <Button
            onClick={() => this.props.closeModal()}
            style={{ marginRight: '8px' }}
          >
            Cancel
          </Button>
          <Button onClick={() => this.handleSubmit()}>
            Create group
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CreateGroupModal