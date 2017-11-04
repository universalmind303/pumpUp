import propTypes          from 'prop-types'
import React              from 'react'
import {
  Text,
  TouchableOpacity,
  View,
}                         from 'react-native'
import { connect }        from 'react-redux'
import { createSelector } from 'reselect'

import { toggleBio }               from '../actions/user'
import { shortParser, textParser } from '../utils'

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
    fullBio,
  },
  handlePress,
  shortOrFullBio,
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



//////////////////
// Link Handler //
//////////////////






/**
 * @todo   decide what you want to do with the parsed links
 * @param  {Function} ctx [react synthetic event for onPress]
 * @return {Function}     [Todo: route the onPress to desired location]
 */
function handleLink(ctx) {
  return ctx
}
