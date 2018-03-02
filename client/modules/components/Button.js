// @flow
import * as React from 'react'
import Button from 'material-ui/Button'

const buttonStyle = {
  fontFamily: `'Montserrat', sans-serif`,
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
}

const MyButton = ({ onClick, disabled, children, style }: Props) => {
  return (
    <Button raised color="primary" onClick={onClick} style={{ ...buttonStyle, ...style }} disabled={disabled}>
      {children}
    </Button>
  )
}

export default MyButton