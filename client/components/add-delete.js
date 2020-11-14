import React from 'react'
import {connect} from 'react-redux'

import {addToCart, orderCreator} from '../store/cart'

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
    //one main problem right now is that when we refresh, we assign a new orderId, which is not something we want.
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
