// @flow
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signUp } from '../../actions/user'

type Props = {
  isFetching: boolean,
  errorMessage: string,
  signUp: ({ username: string, password: string }) => void,
}

class Signup extends React.Component<Props> {
  handleSubmit = e => {
    e.preventDefault()
    const username = this.username.value
    const password = this.password.value

    if (!username || !password) { return }
    this.props.signUp({ username, password })
  }

  render() {
    const { isFetching, errorMessage } = this.props

    return (
      <div>
        <h1>Sign up</h1>
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
          <input type="submit" value="Sign up" />
        </form>
        <Link to="/login">Already have an account?</Link>

        {isFetching && <div>Attemping signup...</div>}
        {errorMessage && <div>{errorMessage}</div>}
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

const mapDispatchToProps = ({ signUp })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)
