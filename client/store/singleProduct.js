import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const WRITE_UPDATES = 'WRITE_UPDATES'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  singleProduct: {},
  updatedProduct: {
    name: '',
    type: '',
    description: '',
    quantity: '',
    price: '',
    file: null
  }
}

/**
 * ACTION CREATORS
 */

//action creator to get the product
export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

//action creator to write the update
export const writeProductUpdate = updateFormInput => {
  return {
    type: WRITE_UPDATES,
    updateFormInput
  }
}

//action creator to update a single campus
export const updateSingleProduct = updates => {
  return {
    type: UPDATE_PRODUCT,
    updates
  }
}

/**
 * THUNK CREATORS
 */

//thunk to get the product
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log('Could not fetch product', error)
    }
  }
}

//thunk to update the product
export const updateProduct = (id, updates) => {
  return async dispatch => {
    try {
      if (updates.file) {
        const formData = new FormData() //multipart form to upload file
        formData.append('upload', updates.file)
        const {data} = await axios.post('/api/upload', formData, {
          headers: {'content-type': 'multipart/form-data'}
        })
        updates.file = null
        updates.imageUrl = data //once we get the imageUrl we can set it on product input
      }

      //make sure we're only sending updates users input
      const updateObj = {}
      for (let key in updates) {
        if (updates[key] !== '' && updates[key] !== null) {
          updateObj[key] = updates[key]
        }
      }

      console.log('update Obj', updateObj)
      const {data} = await axios.put(`/api/products/${id}`, updateObj)
      dispatch(updateSingleProduct(data))
    } catch (err) {
      console.log('Could not update:', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, singleProduct: {...action.product}}
    case WRITE_UPDATES:
      return {
        ...state,
        updatedProduct: {...state.updatedProduct, ...action.updateFormInput}
      }
    case UPDATE_PRODUCT:
      return {...state, singleProduct: {...state.product, ...action.updates}}
    default:
      return state
  }
}
