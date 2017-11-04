import propTypes          from 'prop-types'
import React              from 'react'
import {
  Text,
  View,
  TouchableOpacity
}                         from 'react-native'
import { connect }        from 'react-redux'
import { createSelector } from 'reselect'

import { toggleBio } from '../actions/user'

export default connect(mapState, mapDispatch)(Bio)



///////////////////
// Bio Component //
///////////////////





/*
 * Component for rendering Bio details
 */
function Bio({
  bio: {
    shortBio,
    fullBio
  },
  shortOrFullBio,
  handlePress
}) {
  return (
    <View>
      <Text>{!shortOrFullBio ? shortBio : fullBio}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text >...read {shortOrFullBio ? 'less' : 'more'}</Text>
      </TouchableOpacity>
    </View>
  )
}
Bio.propTypes = {
  bio: propTypes.object.isRequired,
  shortOrFullBio: propTypes.bool.isRequired,
  handlePress: propTypes.func.isRequired,
}



////////////////////////
// State and Dispatch //
////////////////////////





function mapState({user}) {
  return {
    bio: bioParser(user),
  }
}

function mapDispatch(dispatch) {
  return {
    handlePress: () => dispatch(toggleBio()),
  }
}

const bio = ({data}) => data.bio

const bioParser = createSelector(
  [bio],
  (bio) => ({
    fullBio : textParser(bio, handleLink),
    shortBio: shortParser(bio, handleLink)
  })
)



//////////////////////////////////////
// Helper Functions For Bio Parsing //
//////////////////////////////////////






/**
 * [Todo: decide what you want to do with the parsed links]
 * @param  {Function} ctx [react synthetic event for onPress]
 * @return {Function}     [Todo: route the onPress to desired location]
 */
function handleLink(ctx) {
  return ctx
}

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
