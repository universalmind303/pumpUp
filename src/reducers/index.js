import { combineReducers } from 'redux'

import UserReducer from './user'
import PhotoReducer from './photos'

export default combineReducers({
  user  : UserReducer,
  photos: PhotoReducer
})
