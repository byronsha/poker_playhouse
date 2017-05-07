import React from 'react'

const Chips = ({ number, color }) => {
  const chips = Array.from(Array(number + 1).keys()).map(num => {
    return <div key={num} style={{background: color, bottom: `${23 + num*3}px`}}></div>
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