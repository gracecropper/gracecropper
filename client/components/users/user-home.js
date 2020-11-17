import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminHome from '../admin_routes/admin-home'
import {SingleUser} from '..'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      {props.role === 'Admin' ? (
        <AdminHome />
      ) : (
        <div>
          <h3 style={{paddingTop: '50px', paddingBottom: '25px'}}>
            Welcome, {email}
          </h3>
          <SingleUser />{' '}
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    role: state.user.role
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
