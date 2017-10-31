import React from 'react'
import {
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions } from 'react-native'
import {connect} from 'react-redux'

import { fetchPhotos } from '../actions/photos'

const {height, width} = Dimensions.get('window')

function photoMap(photo) {
  return (
    <Image
      source={{uri: photo.thumbnail}}
      style={styles.largeImage}
      key={photo.objectId}
    />
  )
}

function Swiper({
  photos: {
    isNotStarted,
    isLoading,
    data
  },
  getPhotos
})
{
  if(isNotStarted){
    getPhotos()
  }
  if(isLoading) {
    return <Text>Swiper</Text>
  }
  console.log(data)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        // this will bound the size of the ScrollView to be a square because
        // by default, it will expand regardless if it has a flex value or not
        style={{ width, height: width }}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
          showsHorizontalScrollIndicator={false}>
          {data.result.posts.map(photoMap)}
        </ScrollView>
      </View>
    </View>
  )
}


// get userfieed photos
const mapState = function({photos}) {
  return {
    photos: photos
  }
}

const mapDispatch = function(dispatch) {
  return {
    getPhotos: () => dispatch(fetchPhotos(dispatch))
  }
}

const styles = StyleSheet.create({
  largeImage: {
    marginTop:20,
    marginLeft: 20,
    marginRight: 20,
    height: width ,
    width: width,
  },
})

export default connect(mapState, mapDispatch)(Swiper)
