import React from 'react'
import {connect} from 'react-redux'
import {postProducts, writeProducts} from '../../store/allProducts'

export class NewProductDC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {
        name: ''
      },
      validate: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  handleChange(event) {
    //type change
    // if (event.target.name === 'quantity'){
    //   event.target.value = parseInt(event.target.value, 10)
    //   console.log(event.target.value)
    // }
    console.log(event.target.name)
    console.log(event.target.value)
    //writing product info as object
    this.props.writeProduct({[event.target.name]: event.target.value})

    const {name, value} = event.target
    let errors = this.state.errors

    switch (name) {
      case 'name': {
        if (value.length === 0) {
          errors.name = 'Field is required!'
          this.setState({validate: false})
        } else {
          errors.name = ''
          this.setState({validate: true})
        }
      }
      default:
        break
    }
  }

  addItem(event) {
    //do not refresh
    event.preventDefault()

    //add the product if there's no errors in the field!
    if (this.state.validate === true) {
      this.props.addProduct(this.props.newProduct)

      //reset the form
      this.props.writeProduct({
        name: '',
        type: '',
        imageUrl: '',
        size: null,
        description: '',
        quantity: 0,
        price: 0,
        upload: null
      })
    }
  }

  render() {
    let newProduct = this.props.newProduct || {}

    return (
      <form className="addProductsForm" onSubmit={this.addItem}>
        <label htmlFor="New Product" className="productFormHeader">
          <h2>New Product Form</h2>
          <small>
            {this.state.validate ? '' : 'Fill in all missing fields!'}
          </small>
        </label>
        {/* Name of Product */}
        <label>
          Name: <small>{this.state.errors.name}</small>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={this.handleChange}
          value={newProduct.name}
        />
        <label>Product Image:</label>
        <input
          type="file"
          name="upload"
          onChange={evt =>
            this.props.writeProduct({upload: evt.target.files[0]})
          }
        />
        {/* Product Type */}
        <label>Product Type:</label>
        {/* select dropdown here */}
        <select
          value={newProduct.type}
          onChange={this.handleChange}
          name="type"
        >
          <option value="" disabled>
            Type
          </option>
          <option value="Cropped Tops">Cropped Tops</option>
          <option value="Crops">Crops</option>
          <option value="Cropped Pictures">Cropped Pictures</option>
        </select>
        {/* Quantity of Product */}
        <label>Quantity:</label>
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={this.handleChange}
          name="quantity"
          value={newProduct.quantity}
        />
        {/* Price of Product */}
        <label>Price:</label>
        $<input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          onChange={this.handleChange}
          name="price"
          value={newProduct.price}
        />
        {/* Description */}
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={this.handleChange}
          value={newProduct.description}
        />
        <input type="submit" value="submit" className="submitButton" />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    newProduct: state.allProducts.newProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    writeProduct: product => {
      dispatch(writeProducts(product))
    },
    addProduct: productInput => {
      dispatch(postProducts(productInput))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductDC)
