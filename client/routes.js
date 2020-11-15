import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Home,
  AllUsers,
  SingleProduct,
  AllProducts,
  ErrorPage,
  Checkout,
  OrderHistory,
  SingleUser,
  Cart,
  ConfirmationPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/allusers" component={AllUsers} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/allusers" component={AllUsers} />
        <Route path="/products" component={AllProducts} />
        <Route path="/singleproduct/:id" component={SingleProduct} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/allusers" component={AllUsers} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/allusers" component={AllUsers} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/singleproduct/:id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/confirmation" component={ConfirmationPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/userhome" component={UserHome} />
            <Route exact path="/orderhistory" component={OrderHistory} />
            <Route exact path="/editprofile/:id" component={SingleUser} />
            <Route exact path="/editprofile" component={SingleUser} />
          </Switch>
        )}
        {/* Displays our Error Page component as a fallback */}
        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
