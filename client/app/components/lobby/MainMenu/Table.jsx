// @flow
import React from 'react'
import { css } from 'emotion'
import { Button } from 'app/components';

const buttonStyle = css`
  color: white;
  padding: 4px 10px;
  background: blue;
  border: none;
  border-radius: 2px;
  transition: all 0.3s;
  font-size: 12px;

  &:disabled {
    pointer-events: none;
    background: #ddd;
  }
  &:hover {
    background: green;
  }
`

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
        <td>
          <Button
            className={buttonStyle}
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