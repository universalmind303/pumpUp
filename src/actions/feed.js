import { dataFailure, dataSuccess, dataRequest } from './requests'
import { popularFeedPhotos }                     from './service'



export function fetchFeed(dispatch) {

  dispatch(dataRequest('FEED'))
  return async function () {
    try {
      const payload = await popularFeedPhotos()
      if(payload.data) {
        return  dispatch(dataSuccess({
          data: payload.data
        },
        'FEED'
        ))
      }
      throw new Error('no payload.data')
    } catch (error) {
      console.warn('error' , error)
      return dispatch(dataFailure(error, 'FEED'))
    }
  }
}
