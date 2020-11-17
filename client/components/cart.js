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
  orderCreator,
  deleteCart
} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.emptyCart = this.emptyCart.bind(this)
  }
  async componentDidMount() {
    if (this.props.orderId !== undefined) {
      this.props.loadProducts(this.props.orderId)
    } else {
      await this.props.orderCreator()
    }
  }
  handleMinus(orderId, productId) {
    this.props.minus(orderId, productId)
  }

  handlePlus(orderId, productId) {
    this.props.plus(orderId, productId)
  }
  deleteItem(orderId, productId) {
    this.props.removeOrderItem(orderId, productId)
  }
  emptyCart(id) {
    try {
      this.props.emptyCart(id)
      alert('You have successfully deleted your order')
    } catch (err) {
      console.log('Something went wrong with deleting the order', err)
    }
  }

  render() {
    const items = this.props.items || []
    const orderId = this.props.orderId
    let subTotal

    //edits the orderTotal subTotal locally
    if (items.length !== 0 && orderId) {
      subTotal = this.props.items.reduce((accum, val) => {
        return (
          accum + Number(val.orderItem.priceDisplay) * val.orderItem.quantity
        )
      }, 0)
      console.log(subTotal)

      if (subTotal < 0) {
        subTotal = 0
      }
    } else {
      subTotal = 0
    }

    return (
      <div
        className="shopping-cart"
        style={{padding: '50px 50px 475px 100px', height: '1500px'}}
      >
        <h1>Shopping Cart</h1>
        {items.length === 0 ? (
          <h1>
            There are no items in your cart. <br />
            Oops <Link to="/products">Go Shopping</Link>{' '}
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
        <p>Your order total is:</p>
        <p>${subTotal}</p>
        {subTotal > 0 ? (
          <div>
            <Link to="/checkout">Check Out</Link>
            <button
              className="button"
              type="button"
              onClick={() => {
                this.emptyCart(orderId)
              }}
            >
              Delete Order
            </button>
          </div>
        ) : (
          <Link to="/products"> Shop for more items</Link>
        )}
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
      dispatch(deleteOrderItem(orderId, productId)),
    emptyCart: id => dispatch(deleteCart(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
