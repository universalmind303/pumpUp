import propTypes from 'prop-types'
import React     from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet
}                from 'react-native'

export default GridItem

const { width } = Dimensions.get('window')
const margin    = width * 0.002




// GridItem refers to individual photos in the photo grid
function GridItem({photo, rowLength}) {

  const imageWidth  = ( width  / rowLength ) - ( margin * rowLength )
  const imageHeight = width / rowLength

  return (
    <Image
      source={{uri: photo.thumbnail}}
      style={{
        margin: margin,
        height: imageHeight,
        width: imageWidth
      }} />
  )
}

const styles = StyleSheet.create({
  border: {
    margin: margin,
  },
})

GridItem.propTypes = {
  photo    : propTypes.object,
  rowLength: propTypes.number
}
