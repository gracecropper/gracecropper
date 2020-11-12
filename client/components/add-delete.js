import React from 'react'
import {connect} from 'react-redux'

import {addToCart, orderCreator} from '../store/cart'

class AdddeleteDC extends React.Component {
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
      console.log(this.props.product)
      if (!this.props.orderId) {
        console.log('does not have orderId')
        await this.props.orderCreate()
      }
      console.log('here, order id? ', this.props.orderId)
      try {
        this.props.addToCart(this.props.product, this.props.orderId)
        alert('Successfully Added To Cart')
      } catch (err) {
        console.log(
          'something went wrong after we try orderCreate',
          err.message
        )
      }
    } catch (err) {
      console.log('error in add to cart', err.message)
    }
  }

  render() {
    return (
      <div>
        <button type="button" size="lg" onClick={this.handlePlus}>
          +
        </button>
        <p>{this.state.quantity}</p>
        <button type="button" size="lg" onClick={this.handleMinus}>
          -
        </button>
        <button type="button" onClick={this.addToCart}>
          Add To Cart
        </button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    orderId: state.cart.orderId,
    items: state.cart.items
  }
}
const mapDispatch = dispatch => {
  return {
    addToCart: (product, orderId) => dispatch(addToCart(product, orderId)),
    orderCreate: () => dispatch(orderCreator())
  }
}

export default connect(mapState, mapDispatch)(AdddeleteDC)
