import React     from 'react'
import {Text}    from 'react-native'
import {connect} from 'react-redux'

export default connect(mapState)(UserBio)

function UserBio({data}) {
  return <Text>{data.bio}</Text>
}

function mapState({user}) {
  return {
    data: user.data
  }
}
