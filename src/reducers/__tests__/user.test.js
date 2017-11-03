import UserReducer from '../user'


describe('#User Reducer', function () {


  it('should return default state',function () {

    expect(UserReducer(undefined)).toEqual({
      bioToggle   : false,
      data        : {},
      isLoading   : true,
      isNotStarted: true,
    })
  })

  it('should add data on successful fetch', function() {

    expect(UserReducer(undefined,{

      type: 'USER_FETCH_DATA_SUCCESS',
      data: 'hello world'
    })).toMatchObject({

      data        : 'hello world',
      isLoading   : false,
      isNotStarted: true,

    })
  })

  it('should add an error message on failed fetch', function() {

    expect(UserReducer(undefined,{

      type : 'USER_FETCH_ERROR',
      error: new Error('error')
    })).not.toEqual({

      data        : 'hello world',
      isLoading   : false,
      isNotStarted: true,

    })
    expect(UserReducer(undefined,{

      type : 'USER_FETCH_ERROR',
      error: new Error('error')
    })).toHaveProperty('error')

  })

  it('should toggle the state of bioToggle on action', function() {

    expect(UserReducer(undefined, {

      type: 'TOGGLE_BIO'
    })).toMatchObject({

      bioToggle:true

    })
  })

})
