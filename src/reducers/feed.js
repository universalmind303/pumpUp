export default FeedReducer


const FEED_STATE = {
  data        : {},
  isLoading   : true,
  isNotStarted: true,
}

/*
* Reducer for Grid Photos
*/
function FeedReducer(state=FEED_STATE, action) {
  const handlers = {
    'FEED_REQUEST': () => ({
      ...state,
      isLoading   : true,
      isNotStarted: false,
    }),
    'FEED_FETCH_DATA_SUCCESS': () => ({
      ...state,
      data     : action.data,
      isLoading:false,
    }),
    'FEED_FETCH_ERROR': () => ({
      ...state,
      error     : action.error,
      isLoading:false,
    }),
  }

  return action && handlers[action.type] ? handlers[action.type]() : state
}
