/*
 * Helper functions go in this file
 */


/**
 * [splitIntoSubArrays description]
 * @param  {Array} array   [an array you wish to split into multiple arrays]
 * @param  {number} n      [desired sub-array length]
 * @return {Array[]}       [2 dimensional array of array/n length]
 */
export function splitIntoSubArrays(array, n ) {
  return !array.length
    ? []
    : [ array.slice( 0, n ) ]
      .concat( splitIntoSubArrays( array.slice(n), n ) )
}
