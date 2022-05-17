// @flow
import React from 'react'
import { css } from 'emotion'

const shotClock = css`
  position: absolute;
  width: 100%;
  bottom: -3px;

  div {
    float: right;
    height: 3px;
    transition: 0.2s all;
  }
`

type Props = {
  seconds: number
}
type State = {
  seconds: number
}
class ShotClock extends React.Component<Props, State> {
  interval: any

  constructor(props: Props) {
    super(props)

    this.state = {
      seconds: props.seconds
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.seconds === 0) {
        // Todo: this should fire some event that ends the player's turn
      } else {
        this.setState({ seconds: this.state.seconds - 1 })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  
  render() {
    const { seconds } = this.state;
    if (seconds === 0) return null

    let background = '#ffeb3b'
    if (seconds <= 5) {
      background = '#ff5722';
    } else if (seconds <= 10) {
      background = '#ff9800';
    }

    return (
      <div className={shotClock}>
        <div style={{ background: background, width: `${seconds * 3.3}%` }}></div>
      </div>
    );
  }
}

export default ShotClock
