import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/singleproduct/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
