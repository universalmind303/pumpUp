import FeedReducer from '../feed'


describe('#Feed Reducer', function () {

  it('should return default state',function () {
    expect(FeedReducer(undefined)).toEqual({
      isNotStarted: true,
      isLoading: true,
      data: {},
    })
  })
  it('should add data on successful fetch', function() {
    expect(FeedReducer(undefined,{
      type: 'FEED_FETCH_DATA_SUCCESS',
      data: 'hello world'
    })).toEqual({
      isNotStarted: true,
      isLoading: false,
      data: 'hello world',
    })
  })
  it('should add an error message on failed fetch', function() {
    expect(FeedReducer(undefined,{
      type: 'FEED_FETCH_ERROR',
      error: new Error('error')
    })).not.toEqual({
      isNotStarted: true,
      isLoading: false,
      data: 'hello world',
    })
    expect(FeedReducer(undefined,{
      type: 'FEED_FETCH_ERROR',
      error: new Error('error')
    })).toHaveProperty('error')
  })})
