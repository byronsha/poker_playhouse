// @flow
import * as React from 'react'
import { css } from 'emotion'

const style = css`
  padding: 6px 18px;
  color: #fff;
  background: #666;
  border-radius: 4px;
  transition: all 0.3s;
  border: none;
  
  &:hover {
    background: #ccc;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
`

type Props = {
  onClick: () => void,
  className: any,
  disabled: boolean,
  children: React.Node,
}

const Button = ({ onClick, disabled, children }: Props) => {
  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button