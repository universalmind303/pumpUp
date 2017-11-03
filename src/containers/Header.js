import propTypes   from 'prop-types'
import React       from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image }          from 'react-native'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/user'
import Bio           from '../components/Bio'

export default connect(mapState, mapDispatch)(Header)

const {height, width} = Dimensions.get('window')


/*
* Creates a Header and populates it with information from API
*/
function Header ( {
  user: {
    isNotStarted,
    isLoading,
    data: {
      name,
      bio,
      profileInfo,
      profileThumbnail
    },
    bioToggle
  },
  getUserProfile
})
{
  if(isNotStarted) {
    getUserProfile()
    return (
      <ActivityIndicator />
    )
  }
  if(isLoading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <ScrollView>
      <View style={styles.topBorder} />
      <View style={[styles.header, {height: bioToggle ? height : height * 0.22}]}>
        <View style={styles.row}>
          <Image source={{uri: profileThumbnail}} style={styles.profileImage}/>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{name.toUpperCase()}</Text>
            <Bio shortOrFullBio={bioToggle}/>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
Header.propTypes = {
  getUserProfile: propTypes.func,
  toggleBio     : propTypes.func,
  user          : propTypes.object,
}



////////////////////////
// State and Dispatch //
////////////////////////





function mapState(state) {
  return {
    user: state.user
  }
}

function mapDispatch(dispatch) {
  return {
    getUserProfile: () => dispatch(fetchUser(dispatch))
  }
}



////////////
// Styles //
////////////





const profileImageSize = height * 0.18
const styles = StyleSheet.create({
  header: {
    borderBottomColor: null,
    borderColor      : 'transparent',
    backgroundColor  : '#d1c4e9',
    flexDirection    : 'row',
  },
  profileInfo: {
    alignItems   : 'flex-start',
    flexDirection:'row',
    flexWrap     : 'wrap',
    marginTop    : height * 0.05,
    paddingLeft  : 20,
    width        : width -  profileImageSize,
  },
  profileImage: {
    borderRadius: profileImageSize / 2,
    height      : profileImageSize,
    marginLeft  : 5,
    marginTop   : 5,
    paddingRight: 20,
    width       : profileImageSize,
  },
  row: {
    flex         : 1,
    flexDirection: 'row'
  },
  topBorder: {
    backgroundColor: '#a094b7',
    height         : height * 0.02,
  },
  userName: {
    fontSize  : 15,
    fontWeight: 'bold',
  },
})
