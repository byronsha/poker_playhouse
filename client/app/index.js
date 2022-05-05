if (process.env.NODE_ENV === 'development') {
  require('!style-loader!css-loader!sass-loader!../scss/main.scss')
}
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { blue, red } from 'material-ui/styles/colors'

import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import store from './store/store'

import App from './components/App'
import NoMatch from './components/NoMatch'
import Lobby from './components/LobbyLayout'
import Login from './components/Login'
import Signup from './components/Signup'
import Playground from './components/Playground'
import HandHistory from './components/HandHistory'
import Groups from './components/Groups'
import Accounts from './components/Accounts';

const history = syncHistoryWithStore(hashHistory, store)

function requireLogin() {
  if (!store.getState().user.isAuthenticated) {
    store.dispatch(push('/login'))
    return
  }
}

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="lobby" component={Lobby} onEnter={requireLogin}>
          <Route path="hand-history" component={HandHistory} />
          <Route path="groups" component={Groups} />
          <Route path="accounts" component={Accounts} />
        </Route>
        <Route path="playground" component={Playground} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>
)

const theme = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: blue,
    accent: red
  }),
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Root />
  </MuiThemeProvider>,
  document.getElementById('root')
)
