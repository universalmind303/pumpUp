export function dataRequest(source) {
  return {
    type: `${source}_REQUEST`
  }
}

export function dataFailure(error, source) {
  return {
    type: `${source}_FETCH_ERROR`,
    error: error
  }
}

export function dataSuccess({data}, source) {
  return {
    type: `${source}_FETCH_DATA_SUCCESS`,
    data: data
  }
}
