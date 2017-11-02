import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'

import * as actions   from '../photos'


const service     = require('../service')
const middlewares = [thunk]
const mockStore   = configureStore(middlewares)

describe('#fetchPhotos', () => {

  beforeEach(function () {
    jest.resetModules()
  })

  it('should handle a good request gracefully', async function() {
    const store = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchPhotos(store.dispatch))
    expect(actionResponse.type).toEqual('PHOTO_FETCH_DATA_SUCCESS')
  })

  it('should handle a bad request gracefully', async function () {

    service.userFeedPhotos = () => new Error('bad request')

    const store          = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchPhotos(store.dispatch))

    expect(actionResponse.type).toEqual('PHOTO_FETCH_ERROR')

  })
})
