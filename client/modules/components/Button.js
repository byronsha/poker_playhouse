// @flow
import * as React from 'react'
import Button from 'material-ui/Button'

const buttonStyle = {
  fontFamily: 'Montserrat, sans-serif',
  color: '#fff',
  fontSize: '16px',
  padding: '6px 18px',
  minWidth: '0',
  minHeight: '0',
}

type Props = {
  onClick: () => void,
  className: any,
  disabled: boolean,
  children: React.Node,
  style?: Object,
  flat?: boolean,
  secondary?: boolean,
  className?: string,
}

const MyButton = ({ onClick, disabled, children, style, flat, secondary, className }: Props) => {
  const xStyle = {...style};
  if (flat) {
    xStyle.boxShadow = 'none';
  }

  return (
    <Button
      raised
      color={secondary ? 'accent' : 'primary'}
      onClick={onClick}
      style={{ ...buttonStyle, ...xStyle }}
      disabled={disabled}
      className={className}
    >
      {children}
    </Button>
  )
}

export default MyButton