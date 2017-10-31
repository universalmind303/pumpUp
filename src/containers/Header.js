import React from 'react'
import { Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image }    from 'react-native'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/index'

const {height, width} = Dimensions.get('window');


const Header = function ({user: { isNotStarted, isLoading, data}, getUserProfile}){
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
  console.log(data)
  return (
    <View>
      <View style={styles.topBorder} />
      <View style={styles.header}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: data.profileImage}} style={styles.profileImage}/>
          <View style={styles.profileInfo} >
            <Text>{data.name}</Text>
            <Text>{data.bio
              .split('\n')
              .slice(0,2)}...read more</Text>
          </View>
        </View>
        {/* </View> */}
      </View>
    </View>
  )
}

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
    paddingLeft:20,
    width : width -  profileImageSize,
    backgroundColor: 'gray'
  },
  topBorder: {
    height: height * 0.02,
    backgroundColor: '#cbae82'
  },
  header: {
    flexDirection: 'row',
    elevation: 8,
    borderBottomColor: null,
    borderColor: 'transparent',
    height: height * 0.2 ,
    backgroundColor: '#ffe0b2',
  },
  color: {
    color: 'red'
  },
  box: {
    flex: 1
  }

})

const mapState = state => ({user: state.user})

const mapDispatch = dispatch => ({
  getUserProfile: () => dispatch(fetchUser(dispatch))
})

export default connect(mapState, mapDispatch)(Header)
