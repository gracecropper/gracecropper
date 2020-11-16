import React, {Component} from 'react'
import './SingleProductView.css'
import {BrowserRouter as Router, Link, withRouter} from 'react-router-dom'

class SingleProductView extends Component {
  render() {
    const {name, imageUrl, id, orderItem} = this.props.product || []
    const orderId = this.props.orderId
    return (
      <div>
        <div className="image">
          {/* add link into span name */}
          <span>
            <Link to={`/singleproduct/${id}`}>{name}</Link>
          </span>
          <div className="imageprice">
            <img src={imageUrl} className="image" />
            <p className="price">Unit Price: ${orderItem.priceDisplay}</p>
          </div>
        </div>
        <div className="buttons">
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.handleMinus(orderId, id)
            }}
          >
            -
          </button>
          <p className="textblock">The quantity:{orderItem.quantity}</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.handlePlus(orderId, id)
            }}
          >
            +
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.deleteItem(orderId, id)
            }}
          >
            Delete Item
          </button>{' '}
        </div>
      </div>
    )
  }
}

export default SingleProductView
