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

import {Dropdown} from 'react-bootstrap'

const NavBar = ({handleClick, isLoggedIn}) => (
  <div id="navigate">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" style={{color: '#FF8800', fontFamily: 'Garamond'}}>
        <img
          src="/img/crop-icon.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Grace Cropper logo"
        />{' '}
        <i>GraceCropper</i>
      </Navbar.Brand>
      <div id="leftNavLinks">
        <Link to="/" style={{color: '#FF8800', fontFamily: 'Garamond'}}>
          <House />
          Home
        </Link>
        <Link to="/products" style={{color: '#FF8800', fontFamily: 'Garamond'}}>
          <Crop />
          Products
        </Link>
        <Link to="/cart" style={{color: '#FF8800', fontFamily: 'Garamond'}}>
          <Cart />
          Cart
        </Link>
      </div>

      <div id="rightNavLinks">
        {isLoggedIn ? (
          <div className="inOrOut">
            {/* The navbar will show these links after you log in */}
            <Dropdown style={{paddingTop: '20px'}}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                variant="warning"
                style={{color: 'white', fontFamily: 'Garamond'}}
              >
                <i> Profile</i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item to="/userhome" as={Link}>
                  {' '}
                  {/* uses react router dom for link instead of regular link which refreshes the page */}
                  <EmojiSmile />
                  My Home
                </Dropdown.Item>
                <Dropdown.Item to="/orderhistory" as={Link}>
                  Order History
                </Dropdown.Item>
                <Dropdown.Item to="/editprofile" as={Link}>
                  Edit Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link
              to="#"
              onClick={handleClick}
              style={{color: '#FF8800', fontFamily: 'Garamond'}}
            >
              <ArrowDownRight
                style={{color: '#FF8800', fontFamily: 'Garamond'}}
              />
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
