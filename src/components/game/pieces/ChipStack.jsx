import React from 'react'
import _ from 'underscore'

const Chips = ({ number, color }) => {
  const chips = _.range(parseInt(number + 1)).map(num => {
    return <div key={num} style={{background: color, bottom: `${23 + num*5}px`}}></div>
  })

  if (number > 0) {
    return (
      <div className="chips">
        {chips}
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Chips