import React         from 'react'
import {
  Text,
  StyleSheet,
  View,
}                    from 'react-native'
import {connect}     from 'react-redux'

import { chunk }     from '../utils'
import { fetchFeed } from '../actions/feed'
import GridItem      from '../components/GridItem'

export default connect(mapState, mapDispatch)(Grid)

const IMAGES_PER_ROW = 3


function Grid({
  feed: {
    isNotStarted,
    isLoading,
    data
  },
  getFeed
})
{
  if(isNotStarted) {
    getFeed()
    return <Text>Loading</Text>
  }
  if(isLoading) {
    return <Text>Loading</Text>
  }
  const photos = data.result.posts
  const chunks = chunk(photos, IMAGES_PER_ROW)
  return (
    <View>
      {chunks.map(gridRow)}
    </View>
  )
}

function gridPhoto(item) {
  return (
    <GridItem
      photo={item}
      rowLength={IMAGES_PER_ROW}
      key={item.objectId}/>
  )
}

function gridRow(row, i) {
  return (
    <View key={i}
      style={styles.rowContainer}>
      {row.map(gridPhoto)}
    </View>
  )
}

function mapState({feed}) {
  return {
    feed:feed
  }
}

function mapDispatch(dispatch) {
  return {
    getFeed: () => dispatch(fetchFeed(dispatch)),
  }
}


const styles = StyleSheet.create({
  rowContainer: {
    flex:1,
    flexDirection: 'row',
  }
})
