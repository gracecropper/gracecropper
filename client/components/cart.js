import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './cart.css'
import SingleProductView from './SingleProductView'
import {
  getAllCartItems,
  increaseQty,
  decreaseQty,
  deleteOrderItem,
  orderCreator
  // , emptyCart, getOrder
} from '../store/cart'

class Cart extends React.Component {
  // constructor() {
  //   super()
  //   this.handleMinus = this.handleMinus.bind(this)
  //   this.handlePlus = this.handlePlus.bind(this)
  //   this.deleteItem = this.deleteItem.bind(this)
  //   this.emptyCart = this.emptyCart.bind(this)
  //   console.log('inside constructor')
  // }
  componentDidMount() {
    if (this.props.cart.orderId !== null) {
      console.log('orderid', this.props.cart.orderId)
      this.props.loadProducts(this.props.cart.orderId)
    }
  }
  // handleMinus(id) {
  //   console.log('minus item')
  //   e.preventDefault()
  //   this.props.minus(id)
  // }
  // handlePlus(id) {
  //   console.log('plus item')
  //   e.preventDefault()
  //   this.props.plus(id)
  // }
  // deleteItem(id) {
  //   console.log('delete item')
  //   e.preventDefault()
  //   this.props.deleteOrderItem(id)
  // }
  // emptyCart(id) {
  //   console.log('empty cart')
  //   e.preventDefault()
  //   this.props.emptyCart(id)
  // }
  render() {
    // console.log('is it rendering?')
    const items = this.props.cart.items || []
    console.log('this.props', this.props)
    // return <div>hello</div>
    return (
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        {this.props.cart.orderId === null ? (
          <h1>
            There is no Item in your cart. Oops{' '}
            <Link to="/home">Go Shopping</Link>{' '}
          </h1>
        ) : (
          items.map(item => {
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
                  </button>{' '}
                </div>
              </div>
            )
          })
        )}
        {/* <p>Your order total is:</p>
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
        </button> */}
      </div>
    )
  }
}
const mapState = state => {
  return {
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(getAllCartItems()),
    orderCreator: orderId => dispatch(orderCreator(orderId)),
    plus: id => dispatch(increaseQty(id)),
    minus: id => dispatch(decreaseQty(id)),
    deleteOrderItem: id => dispatch(deleteOrderItem(id))
    // emptyCart: (id) => dispatch(emptyCart(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
