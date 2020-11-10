import Axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  }
};


export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get('/api/allproducts');
      const products = response.data;
      const action = setProducts(products);
      dispatch(action)
    }
    catch (err) {
      console.error(err.message)
    }
  }
}

// add to the Redux store with combineReducers
export default function allProductsReducer(state = { products: [], loading: true }, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { products: action.products, loading: false }
    default:
      return state
  }
}
