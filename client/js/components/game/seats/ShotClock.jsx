// @flow
import React from 'react'

type Props = {
  seconds: number
}
type State = {
  seconds: number
}
class ShotClock extends React.Component<Props, State> {
  constructor(props: Props) {
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

    let background = '#ffeb3b'
    if (seconds <= 10) { background = '#ff9800' }
    if (seconds <= 5) { background = '#ff5722' }

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
