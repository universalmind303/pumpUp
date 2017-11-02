import {Animated, Dimensions} from 'react-native'
export default PhotoReducer

const { width }  = Dimensions.get('window')
const scrollX    = new Animated.Value(0)
const photoState = {
  data        : {},
  index       : 0,
  isLoading   : true,
  isNotStarted: true,
  range       : 0,
  scrollX     : scrollX,
  xPosition   : Animated.divide(scrollX, width),
}


function PhotoReducer(state=photoState, action) {
  const handlers = {
    'UPDATE_INDEX': () => {
      return {
        ...state,
        index: action.index,
      }
    },

    'PHOTO_REQUEST': () => ({
      ...state,
      isNotStarted: false,
      isLoading: true
    }),
    'PHOTO_FETCH_ERROR': () => ({
      ...state,
      isLoading:false,
      data     : action.error,
    }),
    'PHOTO_FETCH_DATA_SUCCESS': () => ({
      ...state,
      isLoading:false,
      data     : action.data,
      range    : action.data.result.posts.length
    }),
  }
  return action && handlers[action.type] ? handlers[action.type]() : state
}
