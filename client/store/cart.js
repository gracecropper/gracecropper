import axios from 'axios'
import {REMOVE_USER} from './user'
/**
 * ACTION TYPES
 */
const SET_ITEMS = 'SET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const SET_ORDER = 'SET_ORDER'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
const REMOVE_CART = 'REMOVE_CART'
/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
export const setItems = items => ({
  type: SET_ITEMS,
  items
})

export const deleteItem = productId => ({
  type: DELETE_ITEM,
  productId
})

export const addItem = item => ({
  type: ADD_ITEM,
  item
})
export const setOrder = order => ({
  type: SET_ORDER,
  order
})
export const decreaseQuant = id => ({
  type: DECREMENT_ITEM,
  id
})
export const increaseQuant = id => ({
  type: INCREMENT_ITEM,
  id
})

export const removeCart = () => ({
  type: REMOVE_CART
})

/**
 * THUNK CREATORS
 */
export const getAllCartItems = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cartitems/${orderId}`)
      dispatch(setItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteOrderItem = (orderId, productId) => {
  return async dispatch => {
    try {
      await axios.delete(
        `/api/cartitems/delete?cart=${orderId}&item=${productId}`
      )
      dispatch(deleteItem(productId))
    } catch (error) {
      console.log('Could not delete item', error)
    }
  }
}

export const orderCreator = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cartItems', {
        status: 'In User Cart'
      })
      dispatch(setOrder(data))
    } catch (error) {
      console.log('Could not create orderId', error)
    }
  }
}

//not secure because anyone can set their own price...must fix
export const addToCart = (productsObj, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cartItems/add', {
        quantity: productsObj.quantity,
        price: productsObj.price,
        orderId: orderId,
        productId: productsObj.id
      })
      dispatch(addItem(data))
    } catch (error) {
      console.log('Could not add to cart', error)
    }
  }
}

export const increaseQty = (orderId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cartitems/increment?cart=${orderId}&item=${productId}`
      )
      dispatch(increaseQuant(productId))
    } catch (error) {
      console.log('Could not increase quantity of item', error)
    }
  }
}

export const decreaseQty = (orderId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cartitems/decrement?cart=${orderId}&item=${productId}`
      )
      dispatch(decreaseQuant(productId))
    } catch (error) {
      console.log('Could not decrease quantity of item', error)
    }
  }
}

export const deleteCart = orderId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartitems/${orderId}`)
      dispatch(removeCart())
    } catch (error) {
      console.log('Could not delete cart', error)
    }
  }
}

/**
 * REDUCER
 */
 // can we combine increment and decrement to just 'update_quantity' where it overwrites the quantity
 // can we combine the remove user and remove cart?
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {...action.items}
    case DELETE_ITEM:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.productId
        })
      }

    case ADD_ITEM:
      return {...state, ...action.item}
    case SET_ORDER:
      return {...action.order}
    case INCREMENT_ITEM:
      return {
        ...state,
        products: state.products.map(item => {
          if (item.id === action.id) {
            item.orderItem.quantity++
          }
          return item
        })
      }
    case DECREMENT_ITEM:
      return {
        ...state,
        products: state.products.map(item => {
          if (item.id === action.id) {
            item.orderItem.quantity--
          }
          return item
        })
      }
    case REMOVE_USER:
      return initialState //if you log out set the cart to empty
    case REMOVE_CART:
      return initialState
    default:
      return state
  }
}
