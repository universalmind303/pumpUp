import { dataFailure, dataSuccess, dataRequest } from './requests'
import { userFeedPhotos }                        from './service'

import {Animated, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export function positionStart({nativeEvent}) {
  return {
    type: 'POSITION_START',
    start: nativeEvent.contentOffset.x
  }
}
export function positionEnd({nativeEvent}) {
  return {
    type: 'POSITION_END',
    end: nativeEvent.contentOffset.x
  }
}

export function updateIndex(index) {
  return {
    type: 'UPDATE_INDEX',
    index: index
  }
}

export function fetchPhotos(dispatch) {

  dispatch(dataRequest('PHOTO'))

  return async function () {
    try {
      const payload = await userFeedPhotos()
      return  dispatch(dataSuccess({
        data: payload.data
      },
      'PHOTO'
      ))
    } catch (error) {
      return dispatch(dataFailure(error), 'PHOTO')
    }
  }
}
