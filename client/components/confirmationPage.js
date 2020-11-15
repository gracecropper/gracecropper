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
      <Confetti width={3000} height={3000} numberOfPieces={2500} />
      <Container fluid="md">
        <h3 className="congrat">Thank you for your order!</h3>

        <p className="message">
          {props.orderId
            ? `Your order confirmation number is:  ${props.orderId}
      You will recieve a confirmation email shortly...\n
      The wait time for cropping image is 6-7 days and we will be in short contact :')`
            : `No recent orders. Adopt some new rats today!`}
        </p>
        <Col xs={8} md={6}>
          <Image src="/img/corn-confirm.jpg" alt="confirm" />
        </Col>
        {!props.user && (
          <p className="bottom">
            Want the full grace cropper experience?{' '}
            <Link to="/signup">Sign up</Link> today!
          </p>
        )}
      </Container>
    </div>
  )
}

const mapState = state => ({
  orderId: state.cart.id,
  user: state.user
})

export default connect(mapState)(ConfirmationPage)
