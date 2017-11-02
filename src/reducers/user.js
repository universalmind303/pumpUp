export default UserReducer


const userState = {
  bioToggle   : false,
  data        : {},
  isLoading   : true,
  isNotStarted: true,
}


function UserReducer(state=userState, action) {
  const handlers = {
    'USER_REQUEST': () => ({
      ...state,
      isNotStarted: false,
      isLoading   : true
    }),
    'USER_FETCH_DATA_SUCCESS': () => ({
      ...state,
      isLoading:false,
      data     : action.data
    }),
    'USER_FETCH_ERROR': () => ({
      ...state,
      isLoading:false,
      error     : action.error,
    }),
    'TOGGLE_BIO': () => ({
      ...state,
      bioToggle: !state.bioToggle
    }),
  }
  return action && handlers[action.type] ? handlers[action.type]() : state
}
