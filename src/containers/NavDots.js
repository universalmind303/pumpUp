import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native'
import {connect}     from 'react-redux'


import {updateIndex} from '../actions/photos'
import {selectorTest} from '../selectors/photos'

export default connect(mapState, mapDispatch)(NavDots)

const { width } = Dimensions.get('window')

function NavDots({
  photos,
  index,
  handlePress,
  scrollX,
  xPosition,
  selector
}) {
  // console.log(width / i)
  console.log(scrollX._value, xPosition)
  return (
    <View style={{ flexDirection: 'row' }}>
      {photos.map((_, i) => {
        const opacity = xPosition.interpolate({
          inputRange: [i - 1, i, i + 1],
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
      })}
    </View>
  )
}

function updatePosition(ctx) {
  console.log(ctx)

}
const styles = StyleSheet.create({
  dots: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5
  }
})

function mapState({photos}) {
  return {
    scrollX: photos.scrollX,
    xPosition: photos.xPosition,
    index: photos.index,
    selector: selectorTest(photos)
  }
}
function mapDispatch(dispatch){
  return {
    handlePress: (ctx) => dispatch(updateIndex(ctx))
  }
}
