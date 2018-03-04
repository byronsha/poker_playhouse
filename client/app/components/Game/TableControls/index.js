import React from 'react';
import { css } from 'emotion'

import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

const styles = {
  container: {
    position: 'absolute',
    top: '-30px',
    left: '250px',
  },
  button: {
    minWidth: '10px',
    minHeight: '10px',
    padding: '2px',
  },
}

type Props = {
  onLeaveClick: () => void,
  onStandClick: () => void,
  onRotateClockwise: () => void,
  onRotateCounterClockwise: () => void,
}
function TableControls(props: Props) {
  const {
    onLeaveClick,
    onStandClick,
    onRotateClockwise,
    onRotateCounterClockwise,
  } = props

  return (
    <div style={styles.container}>
      <Button
        style={styles.button}
        onClick={onRotateCounterClockwise}
      >
        <Icon className={css`transform: rotate(-90deg)`}>replay</Icon>
      </Button>
      <Button
        style={styles.button}
        onClick={onRotateClockwise}
      >
        <Icon className={css`transform: rotate(90deg) scaleX(-1);`}>replay</Icon>
      </Button>
      <Button
        color="primary"
        style={styles.button}
        onClick={onStandClick}
      >
        <Icon>arrow_upward</Icon>
      </Button>
      <Button
        color="primary"
        style={styles.button}
        onClick={onLeaveClick}
      >
        <Icon>exit_to_app</Icon>
      </Button>
    </div>
  )
}  

export default TableControls