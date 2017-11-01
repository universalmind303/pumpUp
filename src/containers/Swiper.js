import React                           from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
}                                      from 'react-native'
import {connect}                       from 'react-redux'

import {
  fetchPhotos,
  positionStart,
  positionEnd
}                                      from '../actions/photos'
import Photo                           from '../components/Photo'
import NavDots                         from './NavDots'

const { width } = Dimensions.get('window')

function photoRender({item}) {
  return (
    <Photo
      photo={item}
      key={item.objectId}/>
  )
}

function Swiper({
  photos: {
    isNotStarted,
    isLoading,
    data,
    scrollX,
    range,
    index
  },
  getPhotos,
  updateStartPosition,
  updateEndPosition
})
{
  if(isNotStarted){
    getPhotos()
  }
  if(isLoading) {
    return <Text>Swiper</Text>
  }
  console.log('index', index)
  return (
    <View style={styles.container}>
      <FlatList
        ref={(ctx) => positionChange(ctx, index)}
        onScrollBeginDrag={updateStartPosition}
        onScrollEndDrag={updateEndPosition}
        horizontal={true}
        initialScrollIndex={3}
        getItemLayout={(data, index) => (
          {length: width, offset: width * index, index}
        )}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }
          }]
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

function positionChange(ctx, index) {
  if(ctx) {
    console.log(ctx, index)
    return ctx.initialScrollIndex = index
  }
}
function mapState({photos}) {
  return {
    photos: photos
  }
}

function mapDispatch(dispatch) {
  return {
    getPhotos: () => dispatch(fetchPhotos(dispatch)),
    updateStartPosition: ctx => dispatch(positionStart(ctx)),
    updateEndPosition: ctx => dispatch(positionEnd(ctx))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
})

export default connect(mapState, mapDispatch)(Swiper)
