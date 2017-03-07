import React from 'react'

class Table extends React.Component {
  render() {
    const { table, onTableClick, active } = this.props
    const style = {
      fontWeight: active ? 'bold' : 'normal'
    }

    return (
      <li style={style}>
        {table.name}, {table.players.length}/{table.maxPlayers}
        <button onClick={() => { onTableClick(table.id) }}>Join</button>
      </li>
    )
  }
}

export default Table