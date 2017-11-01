export default FeedReducer


const feedState = {
  isNotStarted: true,
  isLoading: true,
  data: {},
}


function FeedReducer(state=feedState, action) {
  const handlers = {
    'FEED_REQUEST': () => ({
      ...state,
      isNotStarted: false,
      isLoading: true
    }),
    'FEED_FETCH_DATA_SUCCESS': () => ({
      ...state,
      isLoading:false,
      data: action.data
    }),
    'FEED_FETCH_DATA_FAILUER': () => ({
      ...state,
      isLoading:false,
      data: action.error
    }),
  }

  return handlers[action.type] ? handlers[action.type]() : state
}
