// @flow
import * as React from 'react'
import { css } from 'emotion'

const container = css`
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
const body = css`
  padding: 12px;
`

type Props = {
  header?: ?React.Node,
  children: React.Node,
}

const Panel = ({ header, children }: Props) => {
  return (
    <div className={container}>
      {header && (
        <div className={body}>
          <h3>{header}</h3>
        </div>
      )}
      <div className={body}>
        {children}
      </div>
    </div>
  )
}

export default Panel