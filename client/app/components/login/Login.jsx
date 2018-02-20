import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../../actions/user'

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const username = this.username.value
    const password = this.password.value

    if (!username || !password) { return }
    this.props.login({ username, password })
  }

  render() {
    const { isFetching, errorMessage } = this.props

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="What's your name?"
            ref={ref => {this.username = ref}}
          />
          <input
            type="password"
            placeholder="Enter your password"
            ref={ref => {this.password = ref}}
          />
          <input type="submit" value="Login" />
        </form>
        <Link to="/signup">Don't have an account?</Link>

        {isFetching &&
          <div>Attemping login...</div>
        }

        {errorMessage &&
          <div>{errorMessage}</div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching,
    errorMessage: state.user.errorMessage
  }
}

const mapDispatchToProps = ({
  login
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
