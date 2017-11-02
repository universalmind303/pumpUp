import propTypes   from 'prop-types'
import React       from 'react'
import { Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image }          from 'react-native'
import { connect } from 'react-redux'

import { fetchUser, toggleBio } from '../actions/user'

export default connect(mapState, mapDispatch)(Header)

const {height, width} = Dimensions.get('window')

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
  getUserProfile,
  toggleBio
})
{
  if(isNotStarted) {
    getUserProfile()
  }
  if(isLoading) {
    return (
      <View>
        <Text style={styles.color} >is loading</Text>
      </View>
    )
  }
  return (
    <ScrollView>
      <View style={styles.topBorder} />
      <View style={[styles.header, {height: bioToggle ? height : height * 0.2}]}>
        <View style={styles.row}>
          <Image source={{uri: profileThumbnail}} style={styles.profileImage}/>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{name.toUpperCase()}</Text>
            <TouchableOpacity onPress={toggleBio}>
              <Text>{!bioToggle
                ? bio.split('\n').slice(0,2)
                : bio} ...read {bioToggle ? 'less' : 'more'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

function mapState(state) {
  return {
    user: state.user
  }
}

function mapDispatch(dispatch) {
  return {
    toggleBio: () => dispatch(toggleBio()),
    getUserProfile: () => dispatch(fetchUser(dispatch))
  }
}
// styles [CTRL+ENTER]

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

Header.propTypes = {
  getUserProfile: propTypes.func,
  toggleBio     : propTypes.func,
  user          : propTypes.object,
}
