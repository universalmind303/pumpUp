const photoState = {
  isNotStarted: true,
  isLoading: true,
  data: {},
  position: {
    start: 0,
    end:0
  },
  index: 0,
  range: 0
}


function PhotoReducer(state=photoState, action) {
  const handlers = {
    'POSITION_START': () => {
      
      return {
        ...state,
        position: {
          ...state.position,
          start: action.start
        }
      }
    },
    'POSITION_END': () => {

      let i = state.index
      if(action.end > state.position.start) {
        i = i + 1
      } else if(action.end > state.position.start) {
        i = i - 1
      }
      return {
        ...state,
        index: i,
        position: {
          ...state.position,
          end: action.end
        }
      }
    },
    'PHOTO_REQUEST': () => ({
      ...state,
      isNotStarted: false,
      isLoading: true
    }),
    'PHOTO_FETCH_DATA_SUCCESS': () => ({
      ...state,
      isLoading:false,
      data: action.data,
      range: action.data.result.posts.length
    }),
  }
  return handlers[action.type] ? handlers[action.type]() : state
}




export default PhotoReducer
