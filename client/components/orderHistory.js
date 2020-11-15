import React from 'react'
import {connect} from 'react-redux'
import {getMyHistory} from '../store'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getMyHistory()
  }
  render() {
    const orders = this.props.orders || []
    return (
      <div>
        {orders.length ? (
          orders
            .filter(order =>
              ['Delivered', 'Shipped', 'Pending'].includes(order.status)
            )
            .map(order => (
              <div className="order" key={order.id}>
                <p>Date: {order.date}</p>
                <p>Status: {order.status}</p>
                <p>Quantity Ordered: {order.quantity}</p>
                <p>Order Total: {order.orderTotalDisplay}</p>
                <p>Shipped To: {order.shippingAddress}</p>
                <ul>
                  {order.products.map(product => (
                    <li key={product.id}>
                      <p>
                        {`${product.orderItem.quantity} ${product.name} -
                    ${product.orderItem.priceDisplay} per item`}
                      </p>
                      <img src={product.imageUrl} height="100px" />
                    </li>
                  ))}
                </ul>
              </div>
            ))
        ) : (
          <p>
            No Orders Yet...We recommend placing some!{' '}
            <img src="/img/sadCorn.png" />
          </p>
        )}
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
