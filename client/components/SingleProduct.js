import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import AddDelete from './add-delete'
import './SingleProductView.css'
class SingleProduct extends Component {
  componentDidMount() {
    try {
      this.props.loadingProduct(this.props.match.params.id) //productId set in our routes
    } catch (error) {
      console.error('there was an error in componentDidMount SingleProduct')
    }
  }
  render() {
    const {name, imageUrl, price, description} =
      this.props.product.singleProduct || []

    return (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} />
        <p>{price}</p>
        <p>{description}</p>
        <AddDelete product={this.props.product.singleProduct} />
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

export default connect(mapState, mapDispatch)(SingleProduct)
