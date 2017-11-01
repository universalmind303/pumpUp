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

      return  dispatch(dataSuccess({
        data: payload.data
      }, 'USER'))

    } catch (error) {
      return dispatch(dataFailure(error), 'USER')
    }
  }
}
