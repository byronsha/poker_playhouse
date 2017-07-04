import React from 'react'
import Card from './pieces/Card'
import ChipPile from './pieces/ChipPile'

class Board extends React.Component {
  render() {
    let renderedCards = this.props.table.board.slice(0)
    let { table } = this.props

    while (renderedCards.length < 5) {
      renderedCards.push({
        rank: '0',
        suit: '0'
      })
    }

    return (
      <div className="board">
        {table.mainPot > 0 &&
          <div>
            <ChipPile amount={table.mainPot.toFixed(2)} />
            <div>Main Pot: ${table.mainPot.toFixed(2)}</div>  
          </div>
        }

        {renderedCards.map((card, index) => 
          <Card key={index} card={card} />
        )}

        <div className="pot">
          Total Pot: ${table.pot.toFixed(2)}
        </div>
      </div>
    )
  }
}

export default Board
