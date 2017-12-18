import React from 'react';
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

const styles = {
  container: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  button: {
    margin: '4px',
    width: '36px',
    height: '36px'
  },
}

class TableControls extends React.Component {
  render() {
    const {
      onLeaveClick,
      onStandClick,
      onRotateClockwise,
      onRotateCounterClockwise,
    } = this.props

    return (
      <div style={styles.container}>
        <Button
          fab
          style={styles.button}
          onClick={onRotateCounterClockwise}
        >
          <Icon>loop</Icon>
        </Button>
        <Button
          fab
          style={styles.button}
          onClick={onRotateClockwise}
        >
          <Icon>autorenew</Icon>
        </Button>
        <Button
          fab
          color="primary"
          style={styles.button}
          onClick={onStandClick}
        >
          <Icon>arrow_upward</Icon>
        </Button>
        <Button
          fab
          color="primary"
          style={styles.button}
          onClick={onLeaveClick}
        >
          <Icon>exit_to_app</Icon>
        </Button>
      </div>
    )
  }  
}

export default TableControls