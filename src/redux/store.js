import { createStore, combineReducers } from "redux"
import { userAuth, themeFlow } from "./reducers"

const reducers = combineReducers({
  userAuth,
  themeFlow,
})

const store = createStore(
  reducers,
  /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
