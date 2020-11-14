import React, {Component} from 'react'
import './SingleProductView.css'

class SingleProductView extends Component {
  render() {
    const {name, imageUrl, price} = this.props.product || []
    console.log(this.props.product)
    return (
      <div className="image">
        {/* add link into span name */}
        <span>{name}</span>
        <img src={imageUrl} className="image" />
        <p className="price">Price per item: {price}</p>
      </div>
    )
  }
}

export default SingleProductView
