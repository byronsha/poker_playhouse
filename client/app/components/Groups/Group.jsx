// @flow
import * as React from 'react'
import { css } from 'emotion'

const container = css`
  padding: 20px;
  width: 500px;
  border: 1px solid #333;
  border-radius: 4px;
`;
type Props = {
  group: any,
}
class Group extends React.Component<Props> {
  render() {
    return (
      <div className={container}>
        {this.props.group.name}
      </div>
    )
  }
}

export default Group