import React from 'react'
import {connect} from 'react-redux'

import './allusers.css'

const allusers = props => (
  <div id="users">
    All Users will go here
    {props.users}
  </div>
)

const mapState = state => {
  return {
    users: state.admin.users
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(allusers)

//need to map dispatch, get it to get users if user === admin, then it can load....
//need to edit users to include an enum
