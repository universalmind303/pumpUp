export default UserReducer

const USER_STATE = {
  bioToggle   : false,
  data        : {},
  isLoading   : true,
  isNotStarted: true,
}

/*
* Reducer for Header and user state
*/
function UserReducer(state=USER_STATE, action) {

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
      error    : action.error,
    }),

    'TOGGLE_BIO': () => ({
      ...state,
      bioToggle: !state.bioToggle
    }),
  }
  return action && handlers[action.type] ? handlers[action.type]() : state
}
