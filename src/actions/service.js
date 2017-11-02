import axios from 'axios'

const sessionToken = [
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.',
  'eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.',
  'UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g'
].join('')


// API call for information on the user profile
export async function getUserProfile() {

  const payload = await axios.post('http://api.pumpup.com/1/classes/User/318381 ', {
    '_method'      : 'GET',
    '_SessionToken': sessionToken,
    '_version'     : '5.0.5',
  })

  return payload
}

// API call for information on the users photos
export async function userFeedPhotos() {

  const payload = axios.post('http://api.pumpup.com/1/functions/feed/profile/load-batch', {
    '_method'         : 'POST',
    '_SessionToken'   : sessionToken,
    '_version'        : '5.0.5',
    'isThumbnailsOnly': true,
    'limit'           : 5,
    'userId'          : 2707798,
  })

  return payload
}

// API call for information on popular photos
export async function popularFeedPhotos() {

  const payload = axios.post('http://api.pumpup.com/1/functions/feed/popular/load-batch',{
    '_method'         : 'POST',
    '_version'        : '5.0.5',
    '_SessionToken'   : sessionToken,
    'isThumbnailsOnly': true,
    'limit'           : 18,
  })

  return payload
}
