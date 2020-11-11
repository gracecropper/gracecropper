import React from 'react'
import {connect} from 'react-redux'
import {} from './add-delete.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import { addToCart } from '../store/cart'
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
      this.props.addToCart(this.state.quantity, this.props.product.id)
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

const mapDispatch = dispatch => {
  return {
    addToCart: (quantity, id) => dispatch(addToCart(quantity, id))
  }
}

export default connect(null, mapDispatch)(AdddeleteDC)
