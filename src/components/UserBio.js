import React from 'react'
import {Text} from 'react-native'

import {connect} from 'react-redux'


function UserBio({data}) {
  console.log(data)
  return <Text>{data.bio}</Text>
}

const mapState = ({user}) => ({data: user.data})

export default connect(mapState)(UserBio)
