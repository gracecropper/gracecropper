import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    try {
      this.props.loadingProduct(this.props.match.params.id) //productId set in our routes
    } catch (error) {
      console.error('there was an error in componentDidMount SingleProduct')
    }
  }
  render() {
    const {name, imageUrl, price, description} = this.props.product[0] || []
    console.log('in render', name, imageUrl, price, description)
    return (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} />
        <p>{price}</p>
        <p>{description}</p>
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
