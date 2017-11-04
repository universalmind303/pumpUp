export { dataRequest, dataFailure, dataSuccess }

/**
 * [ Informs redux store of API request was started]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
function dataRequest(source) {
  return {
    type: `${source}_REQUEST`
  }
}

/**
 * [ Informs redux store of API Request Fail]
 * @param  {Error} error   [error message from API]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
function dataFailure(error, source) {
  return {
    type: `${source}_FETCH_ERROR`,
    error: error
  }
}

/**
 * [ Informs redux store of API Request Success ]
 * @param  {Error} error   [data object from API]
 * @param  {String} source [source of where the function was called from- 'USER' | 'FEED' | 'PHOTO' ]
 * @return {Object}        [action creator for redux store]
 */
function dataSuccess({data}, source) {
  return {
    type: `${source}_FETCH_DATA_SUCCESS`,
    data: data
  }
}
