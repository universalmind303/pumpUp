import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'

import * as actions   from '../photos'


const middlewares = [thunk]
const mockStore   = configureStore(middlewares)
const service     = require('../service')

describe('#fetchPhotos', function () {

  beforeEach(function () {
    jest.resetModules()
  })

  it('should handle a good request gracefully', async function() {

    const store          = mockStore({})
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

describe('#updateIndex', function () {
  it('should return an actionResponse with propertys of type and index', function() {

    const actionResponse = actions.updateIndex(1)
    expect(actionResponse).toHaveProperty('type')
    expect(actionResponse).toHaveProperty('index')

  })
  it('should return an action response with type:UPDATE_INDEX ', function () {

    const actionResponse = actions.updateIndex(1)
    expect(actionResponse.type).toEqual('UPDATE_INDEX')

  })

})
