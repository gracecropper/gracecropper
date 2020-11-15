import React, {Component} from 'react'
import './SingleProductView.css'

class SingleProductView extends Component {
  render() {
    const {name, imageUrl, price, id, orderItem} = this.props.product || []
    const orderId = this.props.orderId

    return (
      <div>
        <div className="image">
          {/* add link into span name */}
          <span>{name}</span>
          <img src={imageUrl} className="image" />
          <p className="price">Price per item: {price}</p>
        </div>
        <div className="buttons">
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.handlePlus(orderId, id)
            }}
          >
            +
          </button>
          <p className="textblock">The quantity:{orderItem.quantity}</p>
          <button
            className="button"
            type="button"
            onClick={() => {
              this.props.handleMinus(orderId, id)
            }}
          >
            -
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
