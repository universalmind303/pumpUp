import PhotoReducer from '../photos'


describe('#Photo Reducer', function () {


  it('should return default state',function () {

    expect(PhotoReducer(undefined)).toMatchObject({
      isNotStarted: true,
      isLoading   : true,
      data        : {},
    })
  })

  it('should add data on successful fetch', function() {

    expect(PhotoReducer(undefined, {
      type: 'PHOTO_FETCH_DATA_SUCCESS',
      data: 'hello world'
    })).toMatchObject({
      isNotStarted: true,
      isLoading   : false,
      data        : 'hello world',
    })
  })

  it('should add an error message on failed fetch', function() {

    expect(PhotoReducer(undefined,{
      type : 'PHOTO_FETCH_ERROR',
      error: new Error('error')
    })).not.toEqual({
      data        : 'hello world',
      isLoading   : false,
      isNotStarted: true,
    })

    expect(PhotoReducer(undefined,{
      type : 'PHOTO_FETCH_ERROR',
      error: new Error('error')
    })).toHaveProperty('error')
  })

  it('should be able to update index if typeof(index) == number', function() {

    expect(PhotoReducer(undefined, {
      type : 'UPDATE_INDEX',
      index: 1,
    })).toMatchObject({
      index: 1
    })

    expect(PhotoReducer(undefined, {
      type : 'UPDATE_INDEX',
      index: 'xxx'
    })).toMatchObject({
      index: 0
    })
  })
})
