const userState = {
  isNotStarted: true,
  isLoading: true,
  data: {},
  bioToggle: false,
}


function user(state=userState, action) {
  const handlers = {
    'USER_REQUEST': () => ({
      ...state,
      isNotStarted: false,
      isLoading: true
    }),
    'USER_FETCH_DATA_SUCCESS': () => ({
      ...state,
      isLoading:false,
      data: action.data
    }),
    'TOGGLE_BIO': () => ({
      ...state,
      bioToggle: !state.bioToggle
    }),
  }
  return handlers[action.type] ? handlers[action.type]() : state
}

export default user
