import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {default as AddProducts} from './add-products'
import {Jumbotron, Container} from 'react-bootstrap'
import './admin-home.css'
/**
 * COMPONENT
 */
export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h3 style={{color: 'black'}}>Welcome, {email}</h3>
          <p style={{color: 'white'}}>
            <Link to="/allusers">All Users</Link>
          </p>
        </Container>
      </Jumbotron>
      <div id="adminHome">
        <AddProducts />
      </div>
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

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
