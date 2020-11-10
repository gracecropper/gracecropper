import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchAllProducts } from '../redux/allProducts'
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'

/**
 * COMPONENT
 */
class AllProductsDC extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getAllProducts();
  }
  render() {
    const { allProducts, loading } = this.props
    if (loading) {
      return (
        <div>
          <p>Loading...Please wait</p>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    return (
      <div>
        { allProducts.map(elm => {
          return (
            <div key={elm.id}>
              <a href="#">
                <img src={elm.imageUrl} alt="image" />
              </a>
              <Link to={`/singleproduct/${elm.id}`}>
                {elm.name}
              </Link>
            </div>
          )
        })

        }
      </div>
    )
  }

}

const mapState = state => {
  return {
    allProducts: state.allProducts.Products,
    loading: state.allProducts.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts())
  }
}

export const AllProducts = connect(mapState, mapDispatch)(AllProductsDC)



