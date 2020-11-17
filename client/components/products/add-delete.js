import React from 'react'
import {connect} from 'react-redux'
import {addToCart, orderCreator} from '../../store/cart'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './add-delete.css'

class AddDelete extends React.Component {
  constructor(props) {
    super(props)
    this.handlePlus = this.handlePlus.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.notify = this.notify.bind(this)
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
  notify() {
    toast('Successfully Added To Cart')
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
      this.notify()
    } catch (err) {
      console.log('error in add to cart', err.message)
    }
  }

  render() {
    return (
      <div className="productsButtons">
        <button type="button" size="lg" onClick={this.handleMinus}>
          -
        </button>
        <p>{this.state.quantity}</p>
        <button type="button" size="lg" onClick={this.handlePlus}>
          +
        </button>

        <button type="button" onClick={this.addToCart} id="addToCart">
          <ToastContainer />
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
