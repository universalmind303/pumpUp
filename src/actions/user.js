import {getUserProfile} from './service'

export function userDataFailure(error) {
  return {
    type: 'USER_FETCH_ERROR',
    error: error
  }
}

export function userDataSuccess({data}) {
  return {
    type: 'USER_FETCH_DATA_SUCCESS',
    data: data

  }
}

export function userRequest() {
  return {
    type: 'USER_REQUEST'
  }
}

export function toggleBio() {
  return {
    type: 'TOGGLE_BIO'
  }
}

export function fetchUser(dispatch) {
  dispatch(userRequest())
  return async function () {

    try {
      const payload = await getUserProfile()
      return  dispatch(userDataSuccess({data: payload.data}))
    } catch (error) {
      return dispatch(userDataFailure(error))
    }
  }
}
