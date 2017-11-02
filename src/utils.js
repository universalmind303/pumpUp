export function splitIntoSubArrays(array, n ) {
  return !array.length
    ? []
    : [ array.slice( 0, n ) ]
      .concat( splitIntoSubArrays( array.slice(n), n ) )
}
