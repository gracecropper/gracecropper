import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from 'react-bootstrap/Navbar'
import {
  Cart,
  House,
  EmojiSmile,
  EmojiSunglasses,
  EmojiWink,
  Crop,
  ArrowDownRight
} from 'react-bootstrap-icons'

import './navbar.css'

const NavBar = ({handleClick, isLoggedIn}) => (
  <div id="navigate">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/img/crop-icon.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Grace Cropper logo"
        />{' '}
        GraceCropper
      </Navbar.Brand>
      <div id="leftNavLinks">
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
      </div>

      <div id="rightNavLinks">
        {isLoggedIn ? (
          <div className="inOrOut">
            {/* The navbar will show these links after you log in */}
            <Link to="/userhome">
              <EmojiSmile />
              My Home
            </Link>
            <Link to="#" onClick={handleClick}>
              <ArrowDownRight />
              Logout
            </Link>
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
      </div>
    </Navbar>
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
