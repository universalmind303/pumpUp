import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native'

import {connect}     from 'react-redux'

import {updateIndex, selectorTest} from '../actions/photos'

const { width } = Dimensions.get('window')

function NavDots({
  photos,
  index,
  handlePress,
  selector
}) {
  console.log('selector', selector)
  const scrollX = new Animated.Value(0)
  const position = Animated.divide(scrollX, width)
  return (
    <View style={{ flexDirection: 'row' }}>
      {photos.map((_, i) => {
        const opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        })
        return (
          <TouchableOpacity onPress={() =>handlePress(index)}
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

const styles = StyleSheet.create({
  dots: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 8,
    borderRadius: 5
  }
})

const mapState = ({photos}) => {

  return {
    index: photos.index,
    selector: selectorTest(photos)
  }
}
const mapDispatch = dispatch =>({
  handlePress: (ctx) => dispatch(updateIndex(ctx))
})
export default connect(mapState, mapDispatch)(NavDots)
