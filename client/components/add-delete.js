import React from 'react'
import {connect} from 'react-redux'

// import { addToCart, orderCreate } from '../store/cart'
//need to pass in the obj product

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

  addToCart(e) {
    try {
      e.preventDefault()
      let product = {
        name: this.props.name,
        type: this.props.type,
        quantity: this.state.quantity,
        price: this.props.price,
        imageUrl: this.props.imageurl,
        size: this.props.size,
        description: this.props.description
      }
      if (this.props.orderId) {
        this.props.addToCart(product, this.state.orderId)
      } else {
        this.props.orderCreate()
        try {
          this.props.addToCart(product, this.state.orderId)
        } catch (err) {
          console.log(
            'something went wrong after we try orderCreate',
            err.message
          )
        }
      }
    } catch (err) {
      console.log('error in add to cart', err.message)
    }
  }

  render(props) {
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
    //check for orderid
    orderId: state.orderId,
    items: state.items
  }
}
const mapDispatch = dispatch => {
  return {
    addToCart: (product, orderId) => dispatch(addToCart(product, orderId)),
    orderCreate: () => dispatch(orderCreate())
  }
}

export default connect(mapState, mapDispatch)(AdddeleteDC)
