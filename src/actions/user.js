import { dataFailure, dataSuccess, dataRequest } from './requests'
import {getUserProfile}                          from './service'

export function toggleBio() {
  return {
    type: 'TOGGLE_BIO'
  }
}

export function fetchUser(dispatch) {

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
