import { dataFailure, dataSuccess, dataRequest } from './requests'
import { userFeedPhotos }                        from './service'

export function updateIndex(index) {
  return {
    type: 'UPDATE_INDEX',
    index: index
  }
}

export function updatePosition(position) {
  return {
    type: 'UPDATE_POSITION',
    positionChange: position
  }
}


export function fetchPhotos(dispatch) {

  dispatch(dataRequest('PHOTO'))

  return async function () {
    try {
      const payload = await userFeedPhotos()
      if(payload.data) {
        return  dispatch(dataSuccess({
          data: payload.data
        },
        'PHOTO'
        ))
      }
      throw new Error('no payload.data')
    } catch (error) {
      return dispatch(dataFailure(error, 'PHOTO'))
    }
  }
}
