import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../../store/allProducts'
import {BrowserRouter as Router, Link, useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import AddDelete from './add-delete'
import './all-products.css'
import 'bootstrap/dist/css/bootstrap.css'
import {DropdownButton, Dropdown, Button, Container} from 'react-bootstrap'

/**
 * COMPONENT
 */
class AllProductsDC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: 'All',
      loading: true
    }
    this.productsFilter = this.productsFilter.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()

    let query = new URLSearchParams(this.props.history.location.hash)
    if (query.has('#/?filter')) {
      let filter = query.get('#/?filter')
      this.setState({selection: `${filter}`}, () => {
        this.setState({loading: false})
      })
    } else {
      setTimeout(() => this.setState({loading: false}), 200)
    }
  }

  productsFilter(event) {
    this.setState({selection: event})
  }

  handleDelete(id) {
    this.props.deleteProduct(id)
  }

  render() {
    const loading = this.state.loading
    const allProducts = this.props.allProducts || []
    const role = this.props.role || 'User'

    const filteredProducts = allProducts.filter(val => {
      if (this.state.selection === 'crops') {
        return val.type === 'Crops'
      }
      if (this.state.selection === 'croppedtops') {
        return val.type === 'Cropped Tops'
      }
      if (this.state.selection === 'croppedpictures') {
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
            <DropdownButton
              variant="warning"
              id="dropdown-basic-button"
              title="View"
              onSelect={this.productsFilter}
            >
              <Dropdown.Item eventKey="All" href="#/">
                All
              </Dropdown.Item>
              <Dropdown.Item eventKey="crops" href="#/?filter=crops">
                Crops
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="croppedtops"
                href="#/?filter=croppedtops"
              >
                Cropped Tops
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="croppedpictures"
                href="#/?filter=croppedpictures"
              >
                Cropped Photos
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className="products">
          {filteredProducts.map(elm => {
            return (
              <div key={elm.id} className="product">
                <Link to={`/singleproduct/${elm.id}`}>{elm.name}</Link>
                <a href="#">
                  <img src={elm.imageUrl} alt="image" className="images" />
                </a>
                <AddDelete product={elm} />

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
