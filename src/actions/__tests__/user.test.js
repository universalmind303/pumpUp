import configureStore from 'redux-mock-store'
import thunk          from 'redux-thunk'

import * as actions   from '../user'


const middlewares = [thunk]
const mockStore   = configureStore(middlewares)
const service     = require('../service')

describe('#fetchUser', function () {

  beforeEach(function () {
    jest.resetModules()
  })

  it('should handle a good request gracefully', async function() {

    const store          = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchUser(store.dispatch))

    expect(actionResponse.type).toEqual('USER_FETCH_DATA_SUCCESS')

  })

  it('should handle a bad request gracefully', async function () {

    service.getUserProfile = () => new Error('bad request')

    const store          = mockStore({})
    const actionResponse = await store.dispatch(actions.fetchUser(store.dispatch))

    expect(actionResponse.type).toEqual('USER_FETCH_ERROR')

  })
})

describe('#toggleBio', function () {
  it('should return an actionResponse with propertys of ', function() {

    const actionResponse = actions.toggleBio(1)
    expect(actionResponse).toHaveProperty('type')

  })
  it('should return an action response with type:TOGGLE_BIO ', function () {

    const actionResponse = actions.toggleBio(1)
    expect(actionResponse.type).toEqual('TOGGLE_BIO')

  })

})
