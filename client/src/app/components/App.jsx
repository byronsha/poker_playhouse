// @flow
import * as React from 'react'
// import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { css } from 'emotion'

import { tokenLogin } from '../actions/user'

import io from 'socket.io-client'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
// const socket = io('http://localhost:8000/')
const socket = io('/')

const container = css`
  min-height: 100vh;
  background: #fafafa;
`

class App extends React.Component {
  componentDidMount() {
    const { token, tokenLogin } = this.props

    if (token) {
      tokenLogin(token)
    } 
    // else {
    //   if (hashHistory.getCurrentLocation().pathname !== '/login') {
    //     hashHistory.push('/login')
    //   }
    // }
  }

  render() {
    // const { children } = this.props;

    // //https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    // const childrenWithProps = React.Children.map(children, child => {
    //   // Checking isValidElement is the safe way and avoids a typescript
    //   // error too.
    //   if (React.isValidElement(child)) {
    //     return React.cloneElement(child, { socket });
    //   }
    //   return child;
    // });

    // return <div className={container}>{childrenWithProps}</div>;

    return <div className={container}><Outlet context={{ socket }}/></div>;
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
