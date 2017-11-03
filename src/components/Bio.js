import propTypes from 'prop-types'
import React     from 'react'
import {
  Text,
  View,
  TouchableOpacity
}                from 'react-native'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'
import { toggleBio } from '../actions/user'

export default connect(mapState, mapDispatch)(Bio)



///////////////////
// Bio Component //
///////////////////






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
  [bio], (bio) => {
    return {
      fullBio: fullParser(bio, handleLink),
      shortBio: shortParser(bio, handleLink)
    }}
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
 * @return {Object[]}            [see: stringToReactNative for details]
 */
function fullParser(text, callback) {

  const links = text.match(/[#@].*?([\s])/ig)
  const textArray = text.split(/([\s])/)

  links.forEach((link) => {

    for(let i = 0; i < textArray.length; i++) {

      if(/[#@].*?/.test(textArray[i])) {

        textArray[i] = (
          <Text
            key={textArray[i]}
            style={{color: 'blue'}}
            onPress={callback}
          >{textArray[i]}
          </Text>
        )
      }
    }
  })
  return stringToReactNative(textArray)
}

/**
 * [Similar to fullParser, but shortens it to max of 3 rows first]
 * @param  {String}   text       [text to be parsed into links and <Text> objects: max length of 3 rows]
 * @param  {Function} callback   [desired function for the onPress handler]
 * @return {Object[]}            [see: stringToReactNative for details]
 */
function shortParser(text, callback) {

  const textArray = text.split(/([\r\n])/g)
  let returnCount = 0
  let shortened

  for(let i = 0; i < textArray.length; i++) {

    if(returnCount === 3) {
      shortened =  textArray.slice(0,i)
    }
    if(textArray[i] === '\n') {
      returnCount++
    }
  }

  return fullParser(shortened.join(' '), callback)
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

  let textString = ''
  let reactArray = []

  for(let i = 0; i < stringAndObjects.length; i++){

    if(typeof(stringAndObjects[i]) !== 'string') {
      reactArray.push(<Text key={i}>{textString}</Text>, stringAndObjects[i])
      textString = ''
    } else {
      textString += stringAndObjects[i]
    }
  }
  return reactArray
}
