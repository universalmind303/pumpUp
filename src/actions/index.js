import axios from 'axios'
export const getUserData = () => ({type:'GET_USER'})
export const setUser = (user) => ({type:'SET_USER', user})



const sessionToken = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.',
  'eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.',
  'UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
].join('')

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


export function fetchUser(dispatch) {
  dispatch(userRequest())
  return async function () {
    try {
      const payload = await axios.post('http://api.pumpup.com/1/classes/User/318381 ', {
        '_method': 'GET',
        '_version': '5.0.5',
        '_SessionToken': sessionToken
      })
      return  dispatch(userDataSuccess({data: payload.data}))
    } catch (error) {
      return dispatch(userDataFailure(error))
    }
  }
}
