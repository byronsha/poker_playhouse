// @flow
import * as React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { tokenLogin } from '../actions/user'

import io from 'socket.io-client'
const socket = io('/')

type Props = {
  token: string,
  tokenLogin: (token: string) => void,
  children?: ?React.Node,
}

class App extends React.Component<Props> {
  componentDidMount() {
    const { token, tokenLogin } = this.props

    if (token) {
      tokenLogin(token)
    } else {
      if (hashHistory.getCurrentLocation().pathname !== '/login') {
        hashHistory.push('/login')
      }
    }
  }

  render() {
    if (!this.props.children) return null;
    return (
      <div>
        {React.cloneElement(this.props.children, { socket })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { token: state.user.token }
}

const mapDispatchToProps = ({ tokenLogin })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
