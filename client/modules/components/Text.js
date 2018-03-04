// @flow
import * as React from 'react'
import { css } from 'emotion'

type Props = {
  children: React.Node,
  small?: boolean,
  bold?: boolean,
}

const Text = ({ children, small, bold }: Props) => (
  <span className={css`
    font-size: ${small ? '14px' : '16px'};
    font-weight: ${bold ? 'bold': 'normal'};
  `}>
    {children}
  </span>
)

export default Text