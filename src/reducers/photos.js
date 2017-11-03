import { Animated, Dimensions } from 'react-native'
export default PhotoReducer

const { width }   = Dimensions.get('window')
const scrollX     = new Animated.Value(0)
const PHOTO_STATE = {
  data        : {},
  index       : 0,
  isLoading   : true,
  isNotStarted: true,
  scrollX     : scrollX,
  xPosition   : Animated.divide(scrollX, width),
}

/*
* Reducer for Slider Photos 
*/
function PhotoReducer(state=PHOTO_STATE, action) {
  const handlers = {
    'UPDATE_INDEX': () => ({
      ...state,
      index: typeof(action.index) === 'number' ? action.index : state.index,
    }),
    'PHOTO_REQUEST': () => ({
      ...state,
      isLoading: true,
      isNotStarted: false,
    }),
    'PHOTO_FETCH_ERROR': () => ({
      ...state,
      error     : action.error,
      isLoading:false,
    }),
    'PHOTO_FETCH_DATA_SUCCESS': () => ({
      ...state,
      data     : action.data,
      isLoading: false,
    }),
  }
  return action && handlers[action.type] ? handlers[action.type]() : state
}
