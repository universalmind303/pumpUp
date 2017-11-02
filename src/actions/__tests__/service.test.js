const API = require('../service')

describe('#getUserProfile', function() {

  it('should return a 200 status', async function() {
    let response = await API.getUserProfile()
    expect(response.status).toEqual(200)
  })

  it('should return a data object with a bio, name, and profileThumbnail', async function() {
    const response = await API.getUserProfile()
    expect(response.data).toBeDefined()
    expect(response.data.bio).toBeDefined()
    expect(response.data.name).toBeDefined()
    expect(response.data.profileThumbnail).toBeDefined()
  })
})

describe('#userFeedPhotos', function() {

  it('should return a 200 status', async function() {
    let response = await API.userFeedPhotos()
    expect(response.status).toEqual(200)
  })

  it('should return a data object with an array of posts', async function() {
    const response = await API.userFeedPhotos()
    expect(response.data).toBeDefined()
    expect(response.data).toHaveProperty('result');
    expect(response.data.result).toBeDefined()
    expect(Array.isArray(response.data.result.posts)).toBe(true)
  })
})

describe('#popularFeedPhotos', function() {

  it('should return a 200 status', async function() {
    let response = await API.popularFeedPhotos()
    expect(response.status).toEqual(200)
  })

  it('should return a data object with an array of posts', async function() {
    const response = await API.popularFeedPhotos()
    expect(response.data).toBeDefined()
    expect(response.data).toHaveProperty('result');
    expect(response.data.result).toBeDefined()
    expect(Array.isArray(response.data.result.posts)).toBe(true)
  })
})
