import React from 'react'

class ShotClock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      seconds: props.seconds
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.seconds === 0) {

      } else {
        this.setState({ seconds: this.state.seconds - 1 })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  
  render() {
    return (
      <div className="shot-clock">
        <span>{this.state.seconds}</span>
        {Array.from(Array(this.state.seconds).keys()).map(num => {
          let color = 'green'
          if (num <= 20) { color = 'yellow' }
          if (num <= 10) { color = 'orange' }
          if (num <= 5) { color = 'red' }
          return <div key={num} style={{background: color}}></div>
        })}
      </div>
    )
  }
}

export default ShotClock
