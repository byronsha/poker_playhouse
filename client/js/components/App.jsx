import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { tokenLogin } from '../actions/user'

import io from 'socket.io-client'
const socket = io('/')

class App extends React.Component {
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
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          socket
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token
  }
}

const mapDispatchToProps = ({
  tokenLogin
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
