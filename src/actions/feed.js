import { dataFailure, dataSuccess, dataRequest } from './requests'
import { popularFeedPhotos }                     from './service'



export function fetchFeed(dispatch) {

  dispatch(dataRequest('FEED'))
  return async function () {
    try {

      const payload = await popularFeedPhotos()

      return  dispatch(dataSuccess({
        data: payload.data
      },
      'FEED'
      ))
    } catch (error) {
      return dispatch(dataFailure(error), 'FEED')
    }
  }
}
