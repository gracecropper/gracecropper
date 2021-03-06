import Axios from 'axios'

//actions
const SET_PRODUCTS = 'SET_PRODUCTS'
const WRITE_PRODUCT = 'WRITE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

//action creator for getting Products
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

//action creator for writing products
export const writeProducts = addProductInput => {
  return {
    type: WRITE_PRODUCT,
    addProductInput
  }
}

//action creator for adding products
export const addProducts = productInput => {
  return {
    type: ADD_PRODUCT,
    productInput
  }
}

//action creator for deleting products
export const deleteProduct = productId => {
  return {
    type: REMOVE_PRODUCT,
    productId
  }
}

//thunk to get products
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await Axios.get('/api/products')
      const products = response.data
      const action = setProducts(products)
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

//thunk to post products
export const postProducts = productInput => {
  return async dispatch => {
    try {
      //If there is an uploaded file
      if (productInput.upload) {
        const formData = new FormData() //multipart form to upload file
        formData.append('upload', productInput.upload)
        const {data} = await Axios.post('/api/upload', formData, {
          headers: {'content-type': 'multipart/form-data'}
        })
        productInput.upload = null
        productInput.imageUrl = data //once we get the imageUrl we can set it on product input
      }
      const {data} = await Axios.post('/api/products', productInput)
      dispatch(addProducts(data))
    } catch (err) {
      console.log('Could not add the product', err)
    }
  }
}

//thunk to remove products
export const removeProduct = productId => {
  return async dispatch => {
    try {
      Axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (err) {
      console.log('Could not remove product', err)
    }
  }
}

const initialState = {
  products: [],
  loading: true,
  newProduct: {
    name: '',
    type: '',
    imageUrl: '',
    description: '',
    quantity: 0,
    price: 0,
    upload: null //for uploaded file storage
  }
}

// add to the Redux store with combineReducers
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {products: action.products, loading: false}
    case WRITE_PRODUCT:
      return {
        ...state,
        newProduct: {...state.newProduct, ...action.addProductInput}
      }
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.productInput]}
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}
