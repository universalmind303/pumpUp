import propTypes   from 'prop-types'
import React       from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
}                  from 'react-native'
import { connect } from 'react-redux'

import { splitIntoSubArrays }     from '../utils'
import { fetchFeed }              from '../actions/feed'
import GridItem                   from '../components/GridItem'

export default connect(mapState, mapDispatch)(Grid)

const IMAGES_PER_ROW = 3

function Grid({
  feed: {
    data,
    isLoading,
    isNotStarted,
  },
  getFeed
})
{
  if(isNotStarted) {
    getFeed()
    return <ActivityIndicator />
  }
  if(isLoading) {
    return <ActivityIndicator />
  }

  const photos = data.result.posts
  const arrayOfArrays = splitIntoSubArrays(photos, IMAGES_PER_ROW)

  return (
    <View>
      {arrayOfArrays.map(gridRow)}
    </View>
  )
  // a wrapper for our GridItem to play nicely with Array.prototype.map
  function gridPhoto(item) {
    return (
      <GridItem
        photo={item}
        rowLength={IMAGES_PER_ROW}
        key={item.objectId}/>
    )
  }

  // Takes an array of arrays and maps them to sub arrays to form our grid
  function gridRow(row, i) {
    return (
      <View key={i}
        style={styles.rowContainer}>
        {row.map(gridPhoto)}
      </View>
    )
  }
}
Grid.propTypes = {
  feed   : propTypes.object,
  getFeed: propTypes.func.isRequired
}


////////////////////////
// State and Dispatch //
////////////////////////





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



////////////
// STYLES //
////////////





const styles = StyleSheet.create({
  rowContainer: {
    flex         :1,
    flexDirection: 'row',
  }
})
