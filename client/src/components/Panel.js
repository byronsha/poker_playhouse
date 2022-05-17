// @flow
import * as React from 'react'
import { css } from 'emotion'
import cx from 'classnames';

const container = css`
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
`
const darkStyle = css`
  background: #eee;
`
const headerStyle = css`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
`
const darkHeader = css`
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
`
const body = css`
  padding: 16px 24px;
`

type Props = {
  dark?: true,
  header?: ?React.Node,
  children: React.Node,
  className?: string,
}

const Panel = ({ dark, header, children, className }: Props) => {
  return (
    <div className={cx(container, dark && darkStyle, className && className)}>
      {header && (
        <div className={dark ? darkHeader : headerStyle}>
          {typeof header === 'string'
            ? <h2 className={css`margin: 0;`}>{header}</h2>
            : header}
        </div>
      )}
      <div className={body}>
        {children}
      </div>
    </div>
  )
}

export default Panel