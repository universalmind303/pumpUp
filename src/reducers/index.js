import { combineReducers } from 'redux'

import FeedReducer  from './feed'
import PhotoReducer from './photos'
import UserReducer  from './user'

export default combineReducers({
  feed  : FeedReducer,
  photos: PhotoReducer,
  user  : UserReducer,
})
