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
    let seconds = this.state.seconds

    let background = 'green'
    if (seconds <= 20) { background = 'yellow' }
    if (seconds <= 10) { background = 'orange' }
    if (seconds <= 5) { background = 'red' }

    let style = {
      background: background,
      width: `${seconds * 3.3}%`
    }

    if (seconds === 0)  {
      return <div></div>
    }

    return (
      <div className="shot-clock">
        <div style={style}></div>
      </div>
    )
  }
}

export default ShotClock
