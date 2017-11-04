import propTypes from 'prop-types'
import React     from 'react'
import {
  Image,
  Dimensions,
}                from 'react-native'

export default GridItem

const { width } = Dimensions.get('window')
const margin    = width * 0.002


/*
* Individual items to be rendered inside of the photo grid
*/
function GridItem({photo, rowLength}) {

  const imageWidth  = ( width  / rowLength ) - ( margin * rowLength )
  const imageHeight = width / rowLength

  return (
    <Image
      source={{uri: photo.thumbnail}}
      style={styleGenerator(imageHeight,imageWidth)} />
  )

  // Dynamically render the styles based off props
  function styleGenerator(height, width) {
    return {
      margin: margin,
      height: height,
      width : width,
    }
  }
}

GridItem.propTypes = {
  photo    : propTypes.object.isRequired,
  rowLength: propTypes.number.isRequired
}
