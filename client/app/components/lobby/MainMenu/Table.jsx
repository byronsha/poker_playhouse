// @flow
import React from 'react'
import { css } from 'emotion'
import { Button } from 'app/components';

const activeStyle = css`font-weight: bold;`;
const disabledStyle = css`color: #aaa;`;

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
    let className;
    if (active) {
      className = activeStyle;
    } else {
      className = hasTableOpen ? disabledStyle : '';
    }
    return (
      <tr className={className}>
        <td>{table.name}</td>
        <td>${table.minBet.toFixed(2)} / ${(table.minBet * 2).toFixed(2)}</td>
        <td>{table.players.length} / {table.maxPlayers}</td>
        <td className={css`text-align: right;`}>
          <Button
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