// @flow
import React from 'react'
import Button from 'material-ui/Button'

const styles = {
  button: {
    padding: '4px 6px',
    minHeight: '24px',
  }
}

type Props = {
  table: {
    id: number,
    name: string,
    minBet: number,
    players: Array<{}>,
    maxPlayers: number,
  },
  onTableClick: (tableId: number) => void,
  active: boolean,
  hasTableOpen: boolean,
}
class Table extends React.Component<Props> {
  render() {
    const { table, onTableClick, active, hasTableOpen } = this.props
    const style = {
      fontWeight: active ? 'bold' : 'normal'
    }
    return (
      <tr style={style}>
        <td>{table.name}</td>
        <td>${table.minBet.toFixed(2)}/${(table.minBet * 2).toFixed(2)}</td>
        <td>{table.players.length}/{table.maxPlayers}</td>
        <td style={{ textAlign: 'right' }}>
          <Button
            style={styles.button}
            raised
            color="primary"
            disabled={hasTableOpen}
            onClick={() => { onTableClick(table.id) }}
          >
            Join
          </Button>
        </td>
      </tr>
    )
  }
}

export default Table