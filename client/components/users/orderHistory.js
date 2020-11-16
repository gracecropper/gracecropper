import React from 'react'
import {connect} from 'react-redux'
import {getHistory, getSingleUser} from '../../store'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0
    }
  }
  componentDidMount() {
    if (this.props.role === 'Admin' && this.props.match.params.id) {
      this.props.getHistory(this.props.match.params.id)
    } else {
      this.props.getHistory(this.props.userId)
    }
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
          <p style={{'padding-left': '160px'}}>
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
    orders: state.allOrders,
    role: state.user.role,
    userId: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    getHistory: id => dispatch(getHistory(id)),
    getSingleUser: id => dispatch(getSingleUser(id))
  }
}
export default connect(mapState, mapDispatch)(OrderHistory)
