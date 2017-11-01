import React        from 'react'
import App          from './src/index'
import rootReducer  from './src/reducers/index'

// redux
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose
}                   from 'redux'
import thunk        from 'redux-thunk'

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
