import { dataFailure, dataSuccess, dataRequest } from './requests'
import { getUserProfile }                        from './service'

export { toggleBio, fetchUser }

// toggles the visibility of the expanded bio information
function toggleBio() {
  return {
    type: 'TOGGLE_BIO'
  }
}

/**
 * [ dispatches loading status to state -
 *  dispatches the response: either fail or success based off api response
 *  SEE: './service for more details' ]
 * @param  {Function} dispatch [Redux; store.dispatch]
 * @return {Function}          [async () => store.dispatch(dataSuccess|dataFailure)]
 */
function fetchUser(dispatch) {

  dispatch(dataRequest('USER'))

  return async function () {

    try {

      const payload = await getUserProfile()

      if(payload.data) {
        return  dispatch(dataSuccess({
          data: payload.data
        },
        'USER'
        ))
      }
      throw new Error('no payload.data')
    } catch (error) {

      return dispatch(dataFailure(error, 'USER'))
    }
  }
}
