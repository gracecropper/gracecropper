import React from 'react'
import {connect} from 'react-redux'
import {Button, Container, Row, Col} from 'react-bootstrap'
import {addToCart, decreaseQty, increaseQty, orderCreator} from '../store/cart'
import './add-delete.css'

// import { Icon } from 'semantic-ui-react'

class AddDelete extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlus = this.handlePlus.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.state = {
      quantity: 1
    }
  }

  handlePlus(e) {
    e.preventDefault()
    this.setState({
      quantity: this.state.quantity + 1
    })
  }
  handleMinus(e) {
    e.preventDefault()
    this.setState({
      quantity: this.state.quantity - 1 > 0 ? this.state.quantity - 1 : 1
    })
  }

  async addToCart(e) {
    try {
      e.preventDefault()
      this.props.product.quantity = this.state.quantity
      if (!this.props.orderId) {
        console.log('does not have orderId')
        await this.props.orderCreator()
      }
      this.props.addToCart(this.props.product, this.props.orderId)
      alert('Successfully Added To Cart')
    } catch (err) {
      console.log('error in add to cart', err.message)
    }
  }

  render() {
    return (
      <Container fluid className="container1">
        <Row>
          <Col>
            <button type="button" onClick={this.handlePlus} className="buttons">
              <p
                style={{
                  'font-size': '15px',
                  'text-align': 'center',
                  'vertical-align': 'middle'
                }}
              >
                {' '}
                +
              </p>
            </button>
          </Col>
          <Col>
            <p className="quantity" style={{'margin-top': '85px'}}>
              {this.state.quantity}
            </p>
          </Col>
          <Col>
            <button
              type="button"
              onClick={this.handleMinus}
              className="buttons"
            >
              <p
                style={{
                  'font-size': '15px',
                  'text-align': 'center',
                  'vertical-align': 'middle'
                }}
              >
                -
              </p>
            </button>
          </Col>
        </Row>
        <Button
          type="button"
          onClick={this.addToCart}
          variant="warning"
          className="add-to-cart"
        >
          Add To Cart
        </Button>
      </Container>
    )
  }
}
const mapState = state => {
  return {
    orderId: state.cart.id,
    items: state.cart.products,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    addToCart: (product, orderId) => dispatch(addToCart(product, orderId)),
    orderCreator: () => dispatch(orderCreator())
  }
}

export default connect(mapState, mapDispatch)(AddDelete)
