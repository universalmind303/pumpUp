import React                           from 'react'
import {
  Text,
  StyleSheet,
  View,
  FlatList,
}                                      from 'react-native'
import {connect}                       from 'react-redux'

import {
  fetchPhotos,
  positionStart,
  positionEnd
}                                      from '../actions/photos'
import NavDots                         from '../components/navDots'
import Photo                           from '../components/Photo'

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
    data
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
  return (
    <View style={styles.container}>
      <FlatList
        onScrollBeginDrag={updateStartPosition}
        onScrollEndDrag={updateEndPosition}
        horizontal={true}
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
    alignItems: 'center'
  },
})

export default connect(mapState, mapDispatch)(Swiper)
