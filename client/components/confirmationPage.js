import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Confetti from 'react-confetti'
import './confirmationPage.css'
import 'bootstrap/dist/css/bootstrap.css'

import {
  Image,
  Form,
  FormControl,
  Row,
  Col,
  Container,
  Button
} from 'react-bootstrap'

const ConfirmationPage = props => {
  return (
    <div id="checkoutPage">
      <Container>
        <Confetti />

        <h3 className="congrat">Thank you for your order!</h3>

        <p className="message">
          {props.orderId
            ? `Your order confirmation number is:  ${props.orderId}.
      You will receive a confirmation email shortly.
      The wait time for cropping images is 6-7 days. Check your inbox ;)`
            : `No recent orders. Crop it like it's hot today!`}
        </p>
        <Col xs={8} md={6}>
          <Image src="/img/corn-confirm.jpg" alt="confirm" />
        </Col>
        <Col>
          {!props.user.id && (
            <p className="bottom">
              Want the full grace cropper experience?{' '}
              <Link to="/signup">Sign up</Link> today!
            </p>
          )}
        </Col>
      </Container>
    </div>
  )
}

const mapState = state => ({
  orderId: state.cart.id,
  user: state.user
})

export default connect(mapState)(ConfirmationPage)
