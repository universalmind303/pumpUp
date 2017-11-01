import React from 'react'
import { Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image }    from 'react-native'
import { connect } from 'react-redux'

import { fetchUser, toggleBio } from '../actions/user'

export default connect(mapState, mapDispatch)(Header)

const {height, width} = Dimensions.get('window')


function Header ( {
  user: {
    isNotStarted,
    isLoading,
    data,
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: data.profileThumbnail}} style={styles.profileImage}/>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{data.name.toUpperCase()}</Text>
            <TouchableOpacity onPress={toggleBio}>
              <Text>{!bioToggle
                ? data.bio.split('\n').slice(0,2)
                : data.bio} ...read {bioToggle ? 'less' : 'more'}</Text>
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
  profileImage: {
    marginTop: 5,
    marginLeft: 5,
    height: profileImageSize,
    width: profileImageSize,
    borderRadius: profileImageSize / 2,
    paddingRight: 20,
  },
  profileInfo: {
    marginTop: height * 0.05,
    paddingLeft:20,
    width : width -  profileImageSize,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  topBorder: {
    height: height * 0.02,
    backgroundColor: '#a094b7'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    flexDirection: 'row',
    elevation: 8,
    borderBottomColor: null,
    borderColor: 'transparent',
    backgroundColor: '#d1c4e9',
  },
  color: {
    color: 'red'
  },
})
