import React from 'react'

class Board extends React.Component {
  render() {
    const { table } = this.props

    return (
      <div className="board">
        Board: {table.board}
      </div>
    )
  }
}

export default Board
