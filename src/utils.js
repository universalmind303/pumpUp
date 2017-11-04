/*
 * Helper functions go in this file
 */

export { splitIntoSubArrays }

/**
 * [splitIntoSubArrays]
 * @param  {Array} array   [an array you wish to split into multiple arrays]
 * @param  {Number} n      [desired sub-array length]
 * @return {Array[]}       [2 dimensional array of array.length / n ]
 */
function splitIntoSubArrays(array, n ) {

  return !array.length
    ? []
    : [ array.slice( 0, n ) ]
      .concat( splitIntoSubArrays( array.slice(n), n ) )
}
