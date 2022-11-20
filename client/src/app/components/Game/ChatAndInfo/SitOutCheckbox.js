// @flow
import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  container: {
    position: 'absolute',
    top: '-42px',
    right: '-8px',
    display: 'flex',
    alignItems: 'center',
  }
}

type Props = {
  socket: Object,
  table: {
    id: string,
  },
  seat: {
    id: string,
    sittingOut: boolean,
  },
};

class SitOutCheckbox extends React.Component<Props> {
  handleClick = () => {
    const { socket, table, seat } = this.props
    const socketMessage = seat.sittingOut ? 'sitting_in' : 'sitting_out'

    socket.emit(socketMessage, {
      tableId: table.id,
      seatId: seat.id
    })
  }

  render () {
    const { seat } = this.props
    if (!seat) return null

    return (
      <div style={styles.container}>
        Sit out next hand
        <Checkbox checked={seat.sittingOut} onChange={() => this.handleClick()} />
      </div>
    )
  }
}

export default SitOutCheckbox