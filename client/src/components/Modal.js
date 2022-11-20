import * as React from 'react'
import { css } from 'emotion'

import Dialog from 'material-ui/Dialog';

const container = css`
  padding: 24px;
`;

type Props = {
  open: boolean,
  children: React.Node,
}
class Modal extends React.Component<Props> {
  render() {
    return (
      <Dialog open={this.props.open}>
        <div className={container}>
          {this.props.children}
        </div>
      </Dialog>
    )
  }
}

export default Modal;