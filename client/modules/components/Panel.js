// @flow
import * as React from 'react'
import { css } from 'emotion'

const container = css`
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
`
const headerStyle = css`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
`
const body = css`
  padding: 16px 24px;
`

type Props = {
  header?: ?React.Node,
  children: React.Node,
}

const Panel = ({ header, children }: Props) => {
  return (
    <div className={container}>
      {header && (
        <div className={headerStyle}>
          <h2 className={css`margin: 0;`}>{header}</h2>
        </div>
      )}
      <div className={body}>
        {children}
      </div>
    </div>
  )
}

export default Panel