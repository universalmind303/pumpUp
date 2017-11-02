import propTypes       from 'prop-types'
import React           from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
}                      from 'react-native'
import {connect}       from 'react-redux'

import { fetchPhotos } from '../actions/photos'
import Photo           from '../components/Photo'
import NavDots         from './NavDots'


const { width } = Dimensions.get('window')

function photoRender({item}) {
  return (
    <Photo
      photo={item}
      key={item.objectId}/>
  )
}


class Swiper extends React.Component {
  constructor(props) {
    super(props)
  }

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
    }
    if(isLoading) {
      return <Text>Swiper</Text>
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

const styles = StyleSheet.create({
  container: {
    alignItems     : 'center',
    flex           : 1,
    justifyContent : 'center',
    marginBottom   : 50,
  },
})

Swiper.propTypes = {
  photos   : propTypes.object,
  getPhotos: propTypes.func,
}


photoRender.propTypes = {
  item: propTypes.object,
}
export default connect(mapState, mapDispatch)(Swiper)
