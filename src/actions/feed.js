import { dataFailure, dataSuccess, dataRequest } from './requests'
import { popularFeedPhotos }                     from './service'


/* dispatches loading status to state -
 * dispatches the response: either fail or success based off api response
 * SEE: './service for more details'
*/
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
      return dispatch(dataFailure(error, 'FEED'))
    }
  }
}
