import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.scss';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { blue, red } from 'material-ui/styles/colors'

import { Provider } from 'react-redux'
import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import store from './app/store/store'


import App from './app/components/App'
import NoMatch from './app/components/NoMatch'
import Lobby from './app/components/LobbyLayout'
import Login from './app/components/Login'
import Signup from './app/components/Signup'
import HandHistory from './app/components/HandHistory'
import Groups from './app/components/Groups'
import Accounts from './app/components/Accounts';
import LeaderBoard from './app/components/LeaderBoard';

import CustomRouter from './utils/CustomRouter';
import history from './utils/history';

const PrivateLayout = () => {
  if (!store.getState().user.isAuthenticated) return <Navigate to="/login"/>

  return <Lobby><Outlet /></Lobby>
}

const Root = () => {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login/>} />
          <Route path="login" element={<Login/>} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="signup" element={<Signup/>} />
          <Route path="lobby" element={<PrivateLayout />}>
            <Route path="hand-history" element={<HandHistory/>} />
            <Route path="groups" element={<Groups/>} />
            <Route path="accounts" element={<Accounts/>} />
          </Route>
        </Route>
         <Route path="*" element={<NoMatch />} />
      </Routes>
    </CustomRouter>
  )
}

const theme = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: blue,
    accent: red
  }),
})


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

