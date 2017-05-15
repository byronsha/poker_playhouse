require('!style-loader!css-loader!sass-loader!../scss/main.scss')

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import store from './store/store'

import App from './components/App'
import NoMatch from './components/NoMatch'
import Lobby from './components/lobby/Lobby'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Game from './components/game/Game'

const history = syncHistoryWithStore(hashHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="lobby" component={Lobby} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
