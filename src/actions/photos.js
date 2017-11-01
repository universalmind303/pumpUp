import { userFeedPhotos } from './service'

export function photoRequest() {
  return {
    type: 'PHOTO_REQUEST'
  }
}


export function photoDataFailure(error) {
  return {
    type: 'PHOTO_FETCH_ERROR',
    error: error
  }
}

export function photoDataSuccess({data}) {
  return {
    type: 'PHOTO_FETCH_DATA_SUCCESS',
    data: data
  }
}

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
  dispatch(photoRequest())
  return async function () {

    try {
      const payload = await userFeedPhotos()
      return  dispatch(photoDataSuccess({data: payload.data}))
    } catch (error) {
      return dispatch(photoDataFailure(error))
    }
  }
}
