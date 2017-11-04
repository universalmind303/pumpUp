import propTypes   from 'prop-types'
import React       from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
}                  from 'react-native'
import { connect } from 'react-redux'

import { fetchPhotos } from '../actions/photos'
import Photo           from '../components/Photo'
import NavDots         from './NavDots'

const { width } = Dimensions.get('window')

/*
* Slider Component with data loaded from API
*/
class Swiper extends React.Component {
  constructor(props) {
    super(props)
  }


  /* if the state updated, check to see if the index was updated from user clicking on navigation dots
   * if navigation dots changed the index, update the current position to match
  */
  componentDidUpdate() {
    const {
      photos: {
        index
      }
    } = this.props

    if(this._FlatList) {

      this._FlatList.scrollToIndex({
        animated: true,
        index: index
      })
    }
  }

  render () {
    const {
      photos: {
        data,
        isLoading,
        isNotStarted,
        scrollX,
      },
      getPhotos
    } = this.props

    if(isNotStarted){
      getPhotos()
      return (
        <ActivityIndicator />
      )
    }

    if(isLoading) {
      return (
        <ActivityIndicator />
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data.result.posts}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index
          })}
          horizontal={true}
          keyExtractor={item => item.objectId}
          pagingEnabled={true}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }]
          )}
          showsHorizontalScrollIndicator={false}
          ref={ref => {this._FlatList = ref}}
          renderItem={photoRender}
        />
        <NavDots photos={data.result.posts} />
      </View>
    )
  }
}
Swiper.propTypes = {
  getPhotos: propTypes.func.isRequired,
  photos   : propTypes.object,
}

// a wrapper for our Photo to play nicely with Array.prototype.map
function photoRender({item}) {
  return (
    <Photo
      photo={item}
      key={item.objectId}/>
  )
}
photoRender.propTypes = {
  item: propTypes.object.isRequired,
}



////////////////////////
// State and Dispatch //
////////////////////////





function mapState({photos}) {
  return {
    photos: photos,
  }
}

function mapDispatch(dispatch) {
  return {
    getPhotos: () => dispatch(fetchPhotos(dispatch))
  }
}



////////////
// STYLES //
////////////





const styles = StyleSheet.create({
  container: {
    alignItems     : 'center',
    flex           : 1,
    justifyContent : 'center',
    marginBottom   : 50,
  },
})



// this export had to be put at bottom because classes do not hoist the same as functions
export default connect(mapState, mapDispatch)(Swiper)
