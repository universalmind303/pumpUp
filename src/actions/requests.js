

/* sends an action to the specified to let it know there was an api request
 * the source argument refers to the specified reducer - EX: USER, FEED, PHOTO
 * see reducers for more details
*/
export function dataRequest(source) {
  return {
    type: `${source}_REQUEST`
  }
}

// sends an action to the specified reducer to let it know that the api request failed
export function dataFailure(error, source) {
  return {
    type: `${source}_FETCH_ERROR`,
    error: error
  }
}


// sends an action to the specified reducer to let it know that the api request was a success
export function dataSuccess({data}, source) {
  return {
    type: `${source}_FETCH_DATA_SUCCESS`,
    data: data
  }
}
