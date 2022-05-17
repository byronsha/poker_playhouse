// @flow
import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { login } from '../actions/user'

import Icon from 'material-ui/Icon'
import Input from 'material-ui/Input';
import { Panel, Button, Text, Link } from '../../components'

const container = css`
  max-width: 350px;
  padding-top: 200px;
  margin: 0 auto 0;
`
const inputStyle = {
  fontFamily: 'Montserrat, sans-serif',
  width: '100%',
  marginBottom: '16px'
};
const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '12px', 
  color: '#2196f3'
};

type Props = {
  login: ({ username: string, password: string }) => void,
  isFetching: boolean,
  errorMessage: ?string,
}
class Login extends React.Component<Props> {
  username: { value: ?string }
  password: { value: ?string }

  handleSubmit = () => {
    const username = this.username.value
    const password = this.password.value

    if (!username || !password) { return }
    this.props.login({ username, password })
  }

  render() {
    const { isFetching, errorMessage } = this.props

    return (
      <div className={container}>
        <Panel header="Login">
          <Input
            type="text"
            placeholder="Username"
            inputRef={ref => {this.username = ref}}
            style={inputStyle}
          />
          <Input
            type="password"
            placeholder="Password"
            inputRef={ref => {this.password = ref}}
            style={inputStyle}
          />
          <Button onClick={this.handleSubmit}>Login</Button>
          
          <Text small>
            <Link to="/signup" style={linkStyle}>
              Create a new account
              <Icon>trending_flat</Icon>                            
            </Link>
          </Text>
          
          {isFetching && <Text small>Attemping login...</Text>}
          {errorMessage && <Text small>{errorMessage}</Text>}
        </Panel>
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

const mapDispatchToProps = ({ login })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
