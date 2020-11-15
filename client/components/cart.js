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
  constructor(props) {
    super(props)
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    // this.emptyCart = this.emptyCart.bind(this)
    // console.log('inside constructor')
  }
  async componentDidMount() {
    if (this.props.orderId !== undefined) {
      this.props.loadProducts(this.props.orderId)
    } else {
      await this.props.orderCreator()
      this.props.loadProducts(this.props.orderId)
    }
  }
  handleMinus(orderId, productId) {
    console.log('minus item')
    this.props.minus(orderId, productId)
  }
  handlePlus(orderId, productId) {
    console.log('plus item')
    this.props.plus(orderId, productId)
  }
  deleteItem(orderId, productId) {
    this.props.removeOrderItem(orderId, productId)
  }
  // emptyCart(id) {
  //   console.log('empty cart')
  //   e.preventDefault()
  //   this.props.emptyCart(id)
  // }

  render() {
    // console.log('is it rendering?')
    const items = this.props.items || []
    const orderId = this.props.orderId

    return (
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        {orderId === null ? (
          <h1>
            There is no Item in your cart. Oops{' '}
            <Link to="/home">Go Shopping</Link>{' '}
          </h1>
        ) : (
          items.map(item => {
            return (
              <div key={item.id} className="quantity">
                <SingleProductView
                  product={item}
                  orderId={orderId}
                  deleteItem={this.deleteItem}
                  handlePlus={this.handlePlus}
                  handleMinus={this.handleMinus}
                />
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
    items: state.cart.products,
    order: state.cart,
    orderId: state.cart.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: orderId => dispatch(getAllCartItems(orderId)),
    orderCreator: () => dispatch(orderCreator()),
    plus: (orderId, productId) => dispatch(increaseQty(orderId, productId)),
    minus: (orderId, productId) => dispatch(decreaseQty(orderId, productId)),
    removeOrderItem: (orderId, productId) =>
      dispatch(deleteOrderItem(orderId, productId))
    // emptyCart: (id) => dispatch(emptyCart(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
