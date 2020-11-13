import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {
  Cart,
  House,
  EmojiSmile,
  EmojiSunglasses,
  EmojiWink,
  Crop
} from 'react-bootstrap-icons'

import './navbar.css'

import {Dropdown} from 'react-bootstrap'

const NavBar = ({handleClick, isLoggedIn}) => (
  <div id="navigate">
    <nav>
      {isLoggedIn ? (
        <div className="inOrOut">
          {/* The navbar will show these links after you log in */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              User Actions
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/userhome">
                <EmojiSmile />
                My Home
              </Dropdown.Item>
              <Dropdown.Item href="myhistory">Order History</Dropdown.Item>
              <Dropdown.Item href="/editprofile">Edit Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="/userhome" />
          <Link to="/myhistory" />
          <Link to="/editprofile">Edit Profile</Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="inOrOut">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <EmojiSunglasses />
            Login
          </Link>
          <Link to="/signup">
            <EmojiWink />
            Sign Up
          </Link>
        </div>
      )}

      {/* I put this outside of the ternary operator so they appear regardless of whether user is logged in or not. */}
      <Link to="/">
        <House />
        Home
      </Link>
      <Link to="/products">
        <Crop />
        Products
      </Link>
      <Link to="">
        <Cart />
        Cart
      </Link>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
