import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../../store/allProducts'
import {BrowserRouter as Router, Link, withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './all-products.css'

/**
 * COMPONENT
 */
class AllProductsDC extends React.Component {
  constructor() {
    super()
    this.state = {
      selection: 'All',
      sort: ''
    }
    this.productsFilter = this.productsFilter.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  productsFilter(event) {
    this.setState({selection: event.target.value})
  }

  handleDelete(id) {
    this.props.deleteProduct(id)
  }

  render() {
    const loading = this.props.loading
    const allProducts = this.props.allProducts || []
    const role = this.props.role || 'User'

    //filtering products
    //need to refactor once DB gets refactored...
    const filteredProducts = allProducts.filter(val => {
      if (this.state.selection === 'Crops') {
        return val.type === 'Crops'
      }
      if (this.state.selection === 'Cropped Tops') {
        return val.type === 'Cropped Tops'
      }
      if (this.state.selection === 'Cropped Pictures') {
        return val.type === 'Cropped Pictures'
      } else {
        return val
      }
    })

    if (loading) {
      return (
        <div>
          <p>Loading...Please wait</p>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }

    return (
      <div id="productsPage">
        <div className="filteringAndOrdering">
          <div className="View">
            View
            <select name="campuses" onChange={this.productsFilter}>
              <option value="All">All</option>
              <option value="Crops">Crops</option>
              <option value="Cropped Tops">Crop Tops</option>
              <option value="Cropped Pictures">Cropped Photos</option>
            </select>
          </div>
        </div>

        <div className="products">
          {filteredProducts.map(elm => {
            return (
              <div key={elm.id} className="product">
                <a href="#">
                  <img src={elm.imageUrl} alt="image" />
                </a>
                <Link to={`/singleproduct/${elm.id}`}>{elm.name}</Link>

                {/* If the user is an admin, button to delete product */}
                {role === 'Admin' ? (
                  <button
                    type="button"
                    className="deleteProduct"
                    onClick={() => this.handleDelete(elm.id)}
                  >
                    Delete Product
                  </button>
                ) : (
                  ''
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.allProducts.products,
    loading: state.allProducts.loading,
    role: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchProducts()),
    deleteProduct: id => dispatch(removeProduct(id))
  }
}

export const AllProducts = connect(mapState, mapDispatch)(AllProductsDC)
