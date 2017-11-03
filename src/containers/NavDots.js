import propTypes   from 'prop-types'
import React       from 'react'
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
}                  from 'react-native'
import { connect } from 'react-redux'

import { updateIndex }  from '../actions/photos'

export default connect(mapState, mapDispatch)(NavDots)


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
   * @param  {_} _ [we use _ because we do not need it]
   * @param  {index} i  [index value]
   * @return {Object}   [React component of individual navigation dots]
   */
  function opacityControl(_,i) {
    const opacity = xPosition.interpolate({
      inputRange : [i - 1, i, i + 1],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp'
    })
    return (
      <TouchableOpacity onPress={() => handlePress(i)}
        key={i}>
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
    xPosition: photos.xPosition,
  }
}
function mapDispatch(dispatch){
  return {
    handlePress: (ctx) => dispatch(updateIndex(ctx))
  }
}



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
