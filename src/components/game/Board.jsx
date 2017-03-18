import React from 'react'
import Card from './Card'

class Board extends React.Component {
  render() {
    const { table } = this.props

    return (
      <div className="board">
        {table.board.map(card => 
          <Card key={card.rank + card.suit} card={card} />
        )}
      </div>
    )
  }
}

export default Board
