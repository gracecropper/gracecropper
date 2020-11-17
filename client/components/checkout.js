import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import StripeCheckout from 'react-stripe-checkout'
import {Form, FormControl, Row, Col, Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class checkout extends React.Component {
  handleToken(token, address) {}
  render() {
    return (
      <Container style={{'min-height': '100vh'}}>
        <Row className="justify-content-md-center">
          <h1 style={{paddingTop: '30px'}}>Checkout Form</h1>
        </Row>
        <Form>
          <Form.Row>
            <Form.Group controlId="formGridfirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First name" />
            </Form.Group>

            <Form.Group controlId="formGridlastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formGridUserName">
              <Form.Label>Username</Form.Label>
              <FormControl placeholder="Username" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formGridBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>NY</option>
                <option>Middle of Nowhere</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={10}>
              <Form.Check label="Shipping address is the same as my billing address" />
              <Form.Check label="Save this information for next time" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                <strong>Payment Method</strong>
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Credit card"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Row id="payment">
            <div className="container">
              <StripeCheckout
                stripeKey="pk_test_51Hmk1dJSfpsyMJaRPcz6no77LrPylcbf7RHzy2QPQtxhoVrxFG7lkHDCvf5PXZHQRxnkM4pS1wrgYH23p61DEtLA00LIGcDTUo"
                token={this.handleToken}
                amount={Number(this.props.order.orderTotal)}
              >
                <Button type="button" disabled={false} onClick={this.onSubmit}>
                  Click to pay with Stripe!
                </Button>
              </StripeCheckout>
            </div>
          </Row>
          <Link to="/confirmation"> Submit your order</Link>
        </Form>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    order: state.cart,
    orderId: state.cart.id
  }
}
export default connect(mapState)(checkout)
