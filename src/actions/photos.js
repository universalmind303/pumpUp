import { dataFailure, dataSuccess, dataRequest } from './requests'
import { userFeedPhotos }                        from './service'


/**
 * [updateIndex]
 * @param  {Number} index [current index of photo or navigation dot in slider]
 * @return {Object}       [action creator for redux store]
 */
export function updateIndex(index) {
  return {
    type: 'UPDATE_INDEX',
    index: index
  }
}

/**
 * [ dispatches loading status to state -
 *  dispatches the response: either fail or success based off api response
 *  SEE: './service for more details' ]
 * @param  {Function} dispatch [Redux; store.dispatch]
 * @return {Function}          [async () => store.dispatch(dataSuccess|dataFailure)]
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
