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
        isNotStarted,
        isLoading
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

    const {
      photos: {
        data,
        scrollX,
      }
    } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => {this._FlatList = ref}}
          horizontal={true}
          getItemLayout={(data, index) => (
            {
              length: width,
              offset: width * index,
              index
            }
          )}
          onScroll={Animated.event(
            [{ nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }}]
          )}
          keyExtractor={item => item.objectId}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={data.result.posts}
          renderItem={photoRender}
        />
        <NavDots photos={data.result.posts} />
      </View>
    )

  }

}
Swiper.propTypes = {
  photos   : propTypes.object,
  getPhotos: propTypes.func,
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
  item: propTypes.object,
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



// this export had to be put at bottom because it is a class.
export default connect(mapState, mapDispatch)(Swiper)
