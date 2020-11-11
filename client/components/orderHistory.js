import React from 'react'
import {connect} from 'react-redux'
import {getMyHistory} from '../store'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getMyHistory()
  }
  render() {
    console.log(this.props.orders)
    const orders = this.props.orders || []
    return (
      <div>
        {orders.map(order => (
          <div className="order" key={order.id}>
            <p>Date: {order.date}</p>
            <p>Status: {order.status}</p>
            <p>Quantity Ordered: {order.quantity}</p>
            <p>Order Total: {order.orderTotalDisplay}</p>
            <p>Shipped To: {order.shippingAddress}</p>
            <ul>
              {order.orderItems.map(orderItem => (
                <li key={orderItem.id}>
                  <p>
                    {`${orderItem.quantity} ${orderItem.product.name} - 
                    ${orderItem.priceDisplay} per item`}
                  </p>
                  <img src={orderItem.product.imageUrl} height="100px" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
}
const mapState = state => {
  return {
    orders: state.allOrders
  }
}
const mapDispatch = dispatch => {
  return {
    getMyHistory: () => dispatch(getMyHistory())
  }
}
export default connect(mapState, mapDispatch)(OrderHistory)
