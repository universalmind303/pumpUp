import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'

import * as actions   from '../feed'


const service     = require('../service')
const middlewares = [thunk]
const mockStore   = configureStore(middlewares)

describe('#fetchFeed', () => {

  beforeEach(function () {
    jest.resetModules()
  })

  it('should handle a good request gracefully', async function() {
    const store = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchFeed(store.dispatch))
    expect(actionResponse.type).toEqual('FEED_FETCH_DATA_SUCCESS')
  })

  it('should handle a bad request gracefully', async function () {

    service.popularFeedPhotos = () => new Error('bad request')

    const store          = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchFeed(store.dispatch))

    expect(actionResponse.type).toEqual('FEED_FETCH_ERROR')


  })
})
