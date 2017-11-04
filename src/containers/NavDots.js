import propTypes          from 'prop-types'
import React              from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
}                         from 'react-native'
import { connect }        from 'react-redux'
import { createSelector } from 'reselect'

import { updateIndex } from '../actions/photos'

export default connect(mapState, mapDispatch)(NavDots)

const { width } = Dimensions.get('window')

/*
* Navigation dots for Our slider component
*/
function NavDots({
  index,
  handlePress,
  photos,
  scrollX,
  xPosition,
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {photos.map(opacityControl)}
    </View>
  )

  /**
   * [Sets the opacity based off index ]
   * @param  {_} _          [ _ used to signify unimportant value ]
   * @param  {index} index  [ index value]
   * @return {Object}       [ React component of individual navigation dots]
   */
  function opacityControl(_,index) {
    const opacity = xPosition.interpolate({
      inputRange : [index - 1, index, index + 1],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp'
    })
    return (
      <TouchableOpacity onPress={() => handlePress(index)}
        key={index}>
        <Animated.View
          style={[{opacity}, styles.dots]}
        />
      </TouchableOpacity>
    )
  }
}


////////////////////////
// State and Dispatch //
////////////////////////





function mapState({photos}) {
  return {
    index    : photos.index,
    scrollX  : photos.scrollX,
    xPosition: positionSelector(photos),
  }
}
function mapDispatch(dispatch){
  return {
    handlePress: (ctx) => dispatch(updateIndex(ctx))
  }
}

const position = photos => photos.scrollX

const positionSelector = createSelector(
  [position],
  (position) => {
    return Animated.divide(position, width)
  }
)



////////////
// STYLES //
////////////





const styles = StyleSheet.create({
  dots: {
    backgroundColor: '#595959',
    borderRadius   : 5,
    height         : 10,
    margin         : 8,
    width          : 10,
  }
})



NavDots.propTypes = {
  index      : propTypes.number,
  handlePress: propTypes.func,
  photos     : propTypes.array,
  scrollX    : propTypes.object,
  selector   : propTypes.object,
  xPosition  : propTypes.object,
}
