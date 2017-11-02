import { dataFailure, dataSuccess, dataRequest } from './requests'
import { userFeedPhotos }                        from './service'


/* updates the index based off user input
 * index refers to the current photo of photo swiper
*/
export function updateIndex(index) {
  return {
    type: 'UPDATE_INDEX',
    index: index
  }
}

/* dispatches loading status to state -
 * dispatches the response: either fail or success based off api response
 * SEE: './service for more details'
*/
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
