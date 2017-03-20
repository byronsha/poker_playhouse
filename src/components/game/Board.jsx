import React from 'react'
import Card from './Card'

class Board extends React.Component {
  render() {
    let renderedCards = this.props.table.board.slice(0)

    while (renderedCards.length < 5) {
      renderedCards.push({
        rank: '0',
        suit: '0'
      })
    }

    return (
      <div className="board">
        {renderedCards.map((card, index) => 
          <Card key={index} card={card} />
        )}
      </div>
    )
  }
}

export default Board
