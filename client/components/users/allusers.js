import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../../store/admin'

import './allusers.css'

class AllUsersDC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //need function to check if admin is logged in...
    this.props.getUsersInfo()
  }

  render() {
    const users = this.props.users || []

    return (
      <div>
        {/* put if statement here, that will display errorPage if user is not logged into admin account */}
        <div className="pageHeader">
          <h3>All Users</h3>
        </div>
        <div id="users">
          {users.map(user => {
            return (
              <div className="userInfo" key={user.id}>
                <ul>
                  <li>ID: {user.id}</li>
                  <li>email: {user.email}</li>
                  <li>account type: {user.role}</li>
                  <li>
                    <Link to={`/editprofile/${user.id}`}>User Profile</Link>
                  </li>
                  {/* will have to eventually include a link to their order history here too , also edit user link*/}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.admin.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsersInfo: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsersDC)
