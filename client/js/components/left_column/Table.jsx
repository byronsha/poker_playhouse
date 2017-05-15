import React from 'react'

class Table extends React.Component {
  render() {
    const { table, onTableClick, active } = this.props
    const style = {
      fontWeight: active ? 'bold' : 'normal'
    }

    return (
      <tr style={style}>
        <td>{table.name}</td>
        <td>${table.minBet.toFixed(2)}/${(table.minBet * 2).toFixed(2)}</td>
        <td>{table.players.length}/{table.maxPlayers}</td>
        <td>
          <button onClick={() => { onTableClick(table.id) }}>
            <i className="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    )
  }
}

export default Table