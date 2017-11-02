import React        from 'react'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose
}                   from 'redux'
import thunk        from 'redux-thunk'

import App          from './src/index'
import rootReducer  from './src/reducers/index'

export default Main

const middleware = [thunk]
const store      = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer)


function Main() {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}
