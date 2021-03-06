import axios from 'axios'

import { SESSION_TOKEN } from '../config'

export { getUserProfile, userFeedPhotos, popularFeedPhotos }

// API call for information on the user profile
async function getUserProfile() {

  const payload = await axios.post('http://api.pumpup.com/1/classes/User/318381 ', {
    '_method'      : 'GET',
    '_SessionToken': SESSION_TOKEN,
    '_version'     : '5.0.5',
  })

  return payload
}

// API call for information on the users photos
async function userFeedPhotos() {

  const payload = axios.post('http://api.pumpup.com/1/functions/feed/profile/load-batch', {
    '_method'         : 'POST',
    '_SessionToken'   : SESSION_TOKEN,
    '_version'        : '5.0.5',
    'isThumbnailsOnly': true,
    'limit'           : 5,
    'userId'          : 2707798,
  })

  return payload
}

// API call for information on popular photos
async function popularFeedPhotos() {

  const payload = axios.post('http://api.pumpup.com/1/functions/feed/popular/load-batch',{
    '_method'         : 'POST',
    '_version'        : '5.0.5',
    '_SessionToken'   : SESSION_TOKEN,
    'isThumbnailsOnly': true,
    'limit'           : 18,
  })

  return payload
}
