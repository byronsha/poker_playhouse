import React from 'react'
import Card from '../pieces/Card'

class Hand extends React.Component {
  render() {
    return (
      <div className="hand">
        <Card card={this.props.seat.hand[0]} />
        <Card card={this.props.seat.hand[1]} />
      </div>
    )
  }
}

export default Hand