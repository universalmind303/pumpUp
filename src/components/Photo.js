import React from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet
}            from 'react-native'

const { width } = Dimensions.get('window')

export default function Photo({photo}) {
  return (
    <View style={styles.border}>
      <Image
        source={{uri: photo.thumbnail}}
        style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    margin: width * 0.025,
  },
  image: {
    height: width,
    width: width * 0.95,
  },
})
