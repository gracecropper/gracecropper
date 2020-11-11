import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import { getAllCartItems, increaseQuant, decreaseQuant, deleteOrderItem, emptyCart, getOrder } from '../store/cart'

export class CartDC extends React.Component {
  constructor() {
    super()
    this.handleMinus = this.handleMinus.bind(this)
    this.handlePlus = this.handlePlus.bind(this)
    this.deleteItem = this.deleteItem(this)
    this.emptyCart = this.emptyCart(this)
  }
  componentDidMount() {
    // loadproducts()
    // getOrders()// is it tied to userId?
  }
  handleMinus(id) {
    console.log('minus item')
    // e.preventDefault()
    // this.props.increaseQuant(id)
  }
  handlePlus(id) {
    console.log('plus item')
    // e.preventDefault()
    // this.props.decreaseQuant(id)
  }
  deleteItem(id) {
    console.log('delete item')
    // e.preventDefault()
    // this.props.deleteOrderItem(id)
  }
  emptyCart(id) {
    console.log('empty cart')
    // e.preventDefault()
    // this.props.emptyCart(id)
  }
  render() {
    // const { cartItems, order } = this.props
    const cartItems = [
      {
        id: 1,
        quantity: 5000,
        price: 2500,
        orderId: 1,
        productId: 1
      },
      {
        id: 2,
        quantity: 1,
        price: 2,
        orderId: 1,
        productId: 1
      }
    ]
    let order = [
      {
        id: 1,
        date: 2020 - 11 - 11,
        status: 'deliverd',
        paymentMethod: 'Credential',
        quantity: 10,
        orderSubtotal: 2500,
        tax: 1.08,
        orderTotal: null,
        shippingAddress: '777 park place',
        userId: 1
      }
    ]
    return (
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length < 1 ? (
          <h1>
            There is no Item in your cart. Oops{' '}
            <Link to="/home">Go Shopping</Link>{' '}
          </h1>
        ) : (
          cartItems.map(item => {
            return (
              <div key={item.id}>
                <div>
                  <Link to={`/singleproduct/${item.id}`}>{item.name}</Link>
                </div>
                <div>
                  <button
                    type="button"
                    size="lg"
                    onClick={() => {
                      this.props.handlePlus(item.id)
                    }}
                  >
                    +
                  </button>
                  <p>The quantity: {item.quantity}</p>
                  <button
                    type="button"
                    size="lg"
                    onClick={() => {
                      this.handleMinus(item.id)
                    }}
                  >
                    -
                  </button>
                  <p>--------------</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        this.deleteItem(item.id)
                      }}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
                <div>The item's price: ${item.price}</div>
              </div>
            )
          })
        )}
        <p>Your order total is:</p>
        <p>${order[0].orderSubtotal}</p>
        <Link to="/home">Check Out</Link>
        <button
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
// mapState = (state) => {
//   return {
//     cartItems: state.cartItems,
//     order: state.order
//   }
// }
// const mapDispatch = (dispatch) => {
//   return {
//     loadproducts: () => dispatch(getAllCartItems()),
//     loadOrder: () => dispatch(getOrder()),
//     increaseQuant: (id) => dispatch(increaseQuant(id)),
//     decreaseQuant: (id) => dispatch(decreaseQuant(id)),
//     deleteOrderItem: (id) => dispatch(deleteOrderItem(id))
//     ,
//     emptyCart: (id) => dispatch(emptyCart(id))
//   }
// }
// export default connect(mapState, mapDispatch)(cartDC);
