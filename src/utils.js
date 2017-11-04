/*
 * Helper functions
 */
import React    from 'react'
import { Text } from 'react-native'

export { splitIntoSubArrays, textParser, shortParser }

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



//////////////////////////////////////
// Helper Functions For Bio Parsing //
//////////////////////////////////////





/**
 * [Parses @ and # from the bio and turns them into links]
 * @param  {String}   text       [text to be parsed into links and <Text> objects]
 * @param  {Function} callback   [desired function for the onPress handler]
 * @return {Array[]}             [see: stringToReactNative for details]
 */
function textParser(text, callback) {

  /*
   * regex matching:
   * split array by whitespace [\s] and save seperator ( )
   */
  const textArray = text.split(/([\s])/)

  textArray.forEach((body, index) => {

    /*
     * regex matching:
     * match either # or @                [#@]
     * followed by anything of any length .*?
     */
    if(/[#@].*?/.test(body)) {

      // if it starts with # or @, replace it with a <Text> Component
      textArray[index] = (
        <Text
          key={body}
          style={{color: 'blue'}}
          onPress={callback}
        >{body}
        </Text>
      )
    }
  })
  return stringToReactNative(textArray)

  /**
  * [Parses Array of strings and objects into React Text Components]
  * @param  {String&Object[]} stringAndObjects [Array of strings and React<Text> components ]
  * @return {Object[]}       [Uses the <Text> components as delimiters to convert the text into <Text> components]
  *
  *
  * @example
  *  stringToReactNative(['foo', 'bar',<Text>{baz}</Text>])
  *  =>
  *  [<Text>{foobar}</Text>,<Text>{baz}</Text>]
  */
  function stringToReactNative(stringAndObjects) {

    /**
    * [Array of <Text> components]
    * @type {Array[<Type>]}
    */
    let reactArray = []
    let textString = ''

    stringAndObjects.forEach((stringOrObject, index) => {

      // if stringOrObject !== string, concat everything before that into <Text>
      if(typeof(stringOrObject) !== 'string') {

        // append new <Text> to reactArray
        reactArray.push(<Text key={index}>{textString}</Text>, stringOrObject)

        // reset textString
        textString = ''

      } else {

        // concat text string from array[index]
        textString += stringOrObject
      }
    })
    return reactArray
  }
}


/**
 * [Similar to textParser, but shortens it to max of 3 rows first]
 * @param  {String}   text       [text to be parsed into links and <Text> objects: max length of 3 rows]
 * @param  {Function} callback   [desired function for the onPress handler]
 * @return {Object[]}            [see: stringToReactNative for details]
 */
function shortParser(text, callback) {

  /*
   * regex matching:
   * split array by return or newline [\r\n] and save seperator ( )
   */
  const textArray = text.split(/([\r\n])/g)
  let returnCount = 0
  let shortened

  textArray.forEach((body, index) => {

    if(returnCount === 3) {
      shortened = textArray.slice(0,index)
    }
    if(body === '\n') {
      returnCount++
    }
  })
  return textParser(shortened.join(' '), callback)
}
