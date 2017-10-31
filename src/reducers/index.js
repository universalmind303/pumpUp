import { combineReducers } from 'redux'
const userState = {
  isNotStarted: true,
  isLoading: true,
  data: {},
}


function user(state=userState, action) {
  const handlers = {
    'USER_REQUEST': () => {
      return {
        ...state,
        isNotStarted: false,
        isLoading: true
      }
    },
    'USER_FETCH_DATA_SUCCESS': () => {
      return {
        ...state,
        isLoading:false,
        data: action.data
      }
    },
    'USER_IS_LOADING': () => ({
      ...state
    })
  }
  return handlers[action.type] ? handlers[action.type]() : state
}


const rootReducer = combineReducers({
  user,
})

export default rootReducer
