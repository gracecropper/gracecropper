import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/admin'
import {Link} from 'react-router-dom'

class AllUsersDC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getUsersInfo()
  }

  render() {
    const users = this.props.users || []

    return (
      <div>
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
                  <li>
                    <Link to={`/orderhistory/${user.id}`}>
                      User Order History
                    </Link>
                  </li>
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
