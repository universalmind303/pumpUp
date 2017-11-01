import React  from 'react'
import {View, ScrollView} from 'react-native'


import Header from './containers/Header'
import Grid from './containers/Grid'
import Swiper from './containers/Swiper'

export default App

function App() {
  return (
    <View>
      <Header/>
      <ScrollView>
        <Swiper />
        <Grid />
      </ScrollView>
    </View>
  )
}
