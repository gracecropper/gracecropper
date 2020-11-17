import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import './auth-form.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Row, Col, Button, Container} from 'react-bootstrap'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container style={{height: '500px', 'min-height': '100vh'}}>
      <form onSubmit={handleSubmit} name={name}>
        <Row>
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input name="email" type="text" placeholder="Your email..." />
        </Row>
        <Row>
          <label htmlFor="password">
            <p>Password</p>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Your password..."
          />
        </Row>
        <Row>
          <button
            type="submit"
            style={{backgroundColor: '#ffc107', color: 'white'}}
          >
            {displayName}
          </button>
        </Row>
        {error &&
          error.response && (
            <div style={{color: '#ffc107', size: '25px'}}>
              {' '}
              {error.response.data}{' '}
            </div>
          )}
      </form>
      <a href="/auth/google" style={{color: '#ffc107', size: '25px'}}>
        {displayName} with Google
      </a>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
