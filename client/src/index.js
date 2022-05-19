// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.scss';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { blue, red } from 'material-ui/styles/colors'

import { Provider } from 'react-redux'
// import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
// import { syncHistoryWithStore, push } from 'react-router-redux'
import {
   HistoryRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import store from './app/store/store'

// import { Panel, Text, Button } from './components';


import App from './app/components/App'
// // import NoMatch from './app/components/NoMatch'
import Lobby from './app/components/LobbyLayout'
import Login from './app/components/Login'
import Signup from './app/components/Signup'
// // import Playground from './app/components/Playground'
import HandHistory from './app/components/HandHistory'
import Groups from './app/components/Groups'
import Accounts from './app/components/Accounts';
import LeaderBoard from './app/components/LeaderBoard';

// // const history = syncHistoryWithStore(hashHistory, store)

// // function requireLogin() {
// //   if (!store.getState().user.isAuthenticated) {
// //     store.dispatch(push('/login'))
// //     return
// //   }
// // }

// const Root = () => (
//   <Provider store={store}>
//     <Router>
//       <Routes>
//       <Route path="/" element={<App > <Outlet /> </App>}>
//         <Route path="leaderboard" element={<LeaderBoard />} />
//         <Route index path="login" element={<Login/>} />
//         <Route path="signup" element={<Signup/>} />
//         <Route path="lobby" element={<Lobby/>}>
//           {/*<Route path="hand-history" element={<HandHistory/>} />*/}
//           {/*<Route path="groups" element={<Groups/>} />*/}
//           <Route path="accounts" element={<Accounts/>} />
//         </Route>
//         {/*<Route path="playground" element={<Playground/>} />
//         <Route path="*" element={<NoMatch />} />*/}
//       </Route>
//       </Routes>
//     </Router>
//   </Provider>
// )

import CustomRouter from './utils/CustomRouter';
import history from './utils/history';

// const CustomRouter = (props) => <Router {...props} />

const Root = () => {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="login" element={<Login/>} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="signup" element={<Signup/>} />
          <Route path="lobby" element={<Lobby><Outlet /></Lobby>}>
            <Route path="hand-history" element={<HandHistory/>} />
            <Route path="groups" element={<Groups/>} />
            <Route path="accounts" element={<Accounts/>} />
          </Route>
        </Route>
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


// const Login = () => <div>Login</div>
// const App = ({ children }) => <div>{children}</div>

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  // <React.StrictMode>
  //    <MuiThemeProvider theme={theme}>
  //     <Root />
  //   </MuiThemeProvider>
  // </React.StrictMode>
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <MuiThemeProvider theme={theme}>
//     <Root />
//   </MuiThemeProvider>,
//   document.getElementById('root')
// )
