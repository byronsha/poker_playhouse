require('!style-loader!css-loader!sass-loader!./scss/main.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import App from './components/App'
import NoMatch from './components/NoMatch'
import Lobby from './components/lobby/Lobby'
import Login from './components/login/Login'
import Game from './components/game/Game'

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />
      <Route path="login" component={Login} />
      <Route path="lobby" component={Lobby} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
