// @flow
import React from 'react'
import Card from './Card'
import ChipPile from './ChipPile'

type Props = {
  table: {
    board: Array<{
      rank: string,
      suit: string,
    }>,
    mainPot: number,
    pot: number,
  },
}
class Board extends React.Component<Props> {
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
          <div className="main-pot">
            <ChipPile amount={table.mainPot} />
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
