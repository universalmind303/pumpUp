const photoState = {
  isNotStarted: true,
  isLoading: true,
  data: {},
}


function PhotoReducer(state=photoState, action) {
  const handlers = {
    'PHOTO_REQUEST': () => {
      return {
        ...state,
        isNotStarted: false,
        isLoading: true
      }
    },
    'PHOTO_FETCH_DATA_SUCCESS': () => {
      return {
        ...state,
        isLoading:false,
        data: action.data
      }
    },
  }
  return handlers[action.type] ? handlers[action.type]() : state
}




export default PhotoReducer
