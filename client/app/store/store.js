import { createStore, combineReducers, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from '../reducers/user'
import lobby from '../reducers/lobby'
import ui from '../reducers/ui'
import hands from '../reducers/hands'
import groups from '../reducers/groups'
import searchUsers from '../reducers/searchUsers'

const rootReducer = combineReducers({
  user,
  lobby,
  ui,
  hands,
  groups,
  searchUsers,
  routing: routerReducer
})

const masterMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true }),
  routerMiddleware(hashHistory)
)

const store = createStore(
  rootReducer,
  masterMiddleware
)

export default store