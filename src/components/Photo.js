import propTypes from 'prop-types'
import React     from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet
}                from 'react-native'

export default Photo

const { width } = Dimensions.get('window')


/*
* Individual items to be rendered inside of the slider
*/
function Photo({photo}) {
  return (
    <View style={styles.border}>
      <Image
        source={{uri: photo.thumbnail}}
        style={styles.image} />
    </View>
  )
}
Photo.propTypes = {
  photo: propTypes.object.isRequired
}

const styles = StyleSheet.create({
  border: {
    margin: width * 0.025,
  },
  image: {
    height: width,
    width : width * 0.95,
  },
})
