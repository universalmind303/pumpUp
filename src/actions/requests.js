/**
 * [Tells redux store that an API request was started]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
export function dataRequest(source) {
  return {
    type: `${source}_REQUEST`
  }
}

/**
 * [API Request Fail]
 * @param  {Error} error   [error message from API]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
export function dataFailure(error, source) {
  return {
    type: `${source}_FETCH_ERROR`,
    error: error
  }
}

/**
 * [API Request Success]
 * @param  {Error} error   [data object from API]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
export function dataSuccess({data}, source) {
  return {
    type: `${source}_FETCH_DATA_SUCCESS`,
    data: data
  }
}
