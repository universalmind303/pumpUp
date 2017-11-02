import {chunk} from '../utils'

describe('chunk', function () {

  it('should split an array into equal parts based off argument n', function() {

    const i              = 44
    const n              = 3
    const expectedLength =  Math.ceil(i / n)
    const arr            = [...Array(i)]
    const splitby3       = chunk(arr, n)


    expect(splitby3.length).toEqual(expectedLength)

  })

  it('should not mutate original array', function() {

    const arr      = [1,2,3,4,5,6,7,8,9]
    const splitby5 = chunk(arr, 5)

    expect(arr).toEqual(expect.arrayContaining([1,2,3,4,5,6,7,8,9]))
    expect(arr).not.toEqual(splitby5)
  })

})
