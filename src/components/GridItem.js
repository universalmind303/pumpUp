import propTypes from 'prop-types'
import React     from 'react'
import {
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
}                from 'react-native'

export default GridItem

const { width } = Dimensions.get('window')
const margin    = width * 0.002

function GridItem({photo, rowLength}) {
  const imageWidth  = (width  / rowLength) - (margin * rowLength)
  const imageHeight = width / rowLength
  return (
    <TouchableOpacity
      onPress={()=> console.log('enlarge')}
      style={styles.border}>
      <Image
        source={{uri: photo.thumbnail}}
        style={{height: imageHeight, width: imageWidth}} />
    </TouchableOpacity>
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
