// @flow
import * as React from 'react'
import { css } from 'emotion'

const Button = ({ onClick, className, disabled, children }) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button