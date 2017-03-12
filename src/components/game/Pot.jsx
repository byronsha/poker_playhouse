import React from 'react'

class Pot extends React.Component {
  render() {
    const { table } = this.props

    return (
      <div className="pot">
        Pot: {table.pot}
      </div>
    )
  }
}

export default Pot
