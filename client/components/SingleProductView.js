import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import './SingleProductView.css'
class SingleProductView extends Component {
  componentDidMount() {
    try {
      this.props.loadingProduct(this.props.id)
    } catch (error) {
      console.error('there was an error in componentDidMount SingleProduct')
    }
  }
  render() {
    const {name, imageUrl, price} = this.props.product.singleProduct || []
    console.log(this.props.product)
    return (
      <div className="image">
        <span>{name}</span>
        <img src={imageUrl} className="image" />
        <p className="price">Price per item: {price}</p>
      </div>
    )
  }
}
const mapState = state => ({
  product: state.singleProduct
})

const mapDispatch = dispatch => ({
  loadingProduct: id => dispatch(fetchProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProductView)
