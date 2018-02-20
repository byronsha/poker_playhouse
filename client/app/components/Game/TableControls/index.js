import React from 'react';
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

const styles = {
  container: {
    position: 'absolute',
    top: '4px',
    right: '0',
  },
  button: {
    marginRight: '4px',
    minWidth: '20px',
    padding: '4px 6px',
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
          style={styles.button}
          onClick={onRotateCounterClockwise}
        >
          <Icon>loop</Icon>
        </Button>
        <Button
          style={styles.button}
          onClick={onRotateClockwise}
        >
          <Icon>autorenew</Icon>
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
}

export default TableControls