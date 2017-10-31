/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import App from './src/index'
import rootReducer from './src/reducers/index'

// redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


const middleware = [thunk]
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer)


const Main = function () {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}

export default Main
