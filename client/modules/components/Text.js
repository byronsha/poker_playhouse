// @flow
import * as React from 'react'
import { css } from 'emotion'

type Props = {
  children: React.Node,
  small?: boolean,
  large?: boolean,
  bold?: boolean,
}

const Text = ({ children, small, large, bold }: Props) => (
  <span className={css`
    ${small ? 'font-size: 14px' : ''}
    ${large ? 'font-size: 20px' : ''}
    font-weight: ${bold ? '600': 'normal'};
  `}>
    {children}
  </span>
)

export default Text