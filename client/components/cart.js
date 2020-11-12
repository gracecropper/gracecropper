import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './cart.css'
import {
  getAllCartItems,
  increaseQty,
  decreaseQty,
  deleteOrderItem
  // , emptyCart, getOrder
} from '../store/cart'

import SingleProductView from './SingleProductView'

export class CartDC extends React.Component {
  constructor() {
    super()
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
    this.deleteItem = this.deleteItem(this)
    this.emptyCart = this.emptyCart(this)
  }
  componentDidMount() {
    loadproducts()
    getOrders() // is it tied to userId?
  }
  handleMinus(id) {
    console.log('minus item')
    e.preventDefault()
    this.props.increaseQuant(id)
  }
  handlePlus(id) {
    console.log('plus item')
    e.preventDefault()
    this.props.decreaseQuant(id)
  }
  deleteItem(id) {
    console.log('delete item')
    e.preventDefault()
    this.props.deleteOrderItem(id)
  }
  emptyCart(id) {
    console.log('empty cart')
    e.preventDefault()
    this.props.emptyCart(id)
  }
  render() {
    // const { cartItems, order } = this.props

    return (
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        {cartItems.length < 1 ? (
          <h1>
            There is no Item in your cart. Oops{' '}
            <Link to="/home">Go Shopping</Link>{' '}
          </h1>
        ) : (
          cartItems.map(item => {
            return (
              <div key={item.id} className="quantity">
                <SingleProductView id={item.id} />
                <Link to={`/singleproduct/${item.id}`}>{item.name}</Link>
                <div className="buttons">
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      this.props.handlePlus(item.id)
                    }}
                  >
                    +
                  </button>
                  <p className="textblock">The quantity:{item.quantity}</p>
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      this.handleMinus(item.id)
                    }}
                  >
                    -
                  </button>

                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      this.deleteItem(item.id)
                    }}
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            )
          })
        )}
        <p>Your order total is:</p>
        <p>${order.orderSubtotal}</p>
        <Link to="/home">Check Out</Link>
        <button
          className="button"
          type="button"
          onClick={() => {
            this.emptyCart(order.id)
          }}
        >
          Delete Order
        </button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    cartItems: state.cartItems,
    order: state.order
  }
}
const mapDispatch = dispatch => {
  return {
    loadproducts: () => dispatch(getAllCartItems()),
    loadOrder: () => dispatch(getOrder()),
    increaseQuant: id => dispatch(increaseQty(id)),
    decreaseQuant: id => dispatch(decreaseQty(id)),
    deleteOrderItem: id => dispatch(deleteOrderItem(id))
    // emptyCart: (id) => dispatch(emptyCart(id))
  }
}
export default connect(mapState, mapDispatch)(CartDC)

// const cartItems = [
//   {
//     id: 1,
//     quantity: 5000,
//     price: 2500,
//     orderId: 1,
//     productId: 1
//   },
//   {
//     id: 2,
//     quantity: 1,
//     price: 2,
//     orderId: 1,
//     productId: 1
//   }
// ]
// const order = {
//   id: 1,
//   date: 2020 - 11 - 11,
//   status: 'deliverd',
//   paymentMethod: 'Credential',
//   quantity: 10,
//   orderSubtotal: 3500,
//   tax: 1.08,
//   orderTotal: null,
//   shippingAddress: '777 park place',
//   userId: 1
// }
