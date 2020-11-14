import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_ITEMS = 'SET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const SET_ORDER = 'SET_ORDER'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const setItems = items => ({
  type: SET_ITEMS,
  items
})

// const deleteItem = orderItemId => ({
//   type: DELETE_ITEM,
//   orderItemId
// })

const addItem = item => ({
  type: ADD_ITEM,
  item
})
const setOrder = order => ({
  type: SET_ORDER,
  order
})
const decreaseQuant = id => ({
  type: DECREMENT_ITEM,
  id
})
const increaseQuant = id => ({
  type: INCREMENT_ITEM,
  id
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
export const deleteOrderItem = orderItemId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartitems/${orderItemId}`)
      dispatch(deleteItem(orderItemId))
    } catch (error) {
      console.log('there was an error in deleteOrderItem in redux', error)
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
      console.log('there was an error in orderCreator', error)
    }
  }
}
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
      console.log('there was an error in addToCart in redux', error)
    }
  }
}

export const increaseQty = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cartitems/${id}/increment`)
      dispatch(increaseQuant(id))
    } catch (error) {
      console.log('there was a problem in increaseQty in redux.')
    }
  }
}
export const decreaseQty = id => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cartitems/${id}/decrement`)
      dispatch(decreaseQuant(id))
    } catch (error) {
      console.log('there was a problem in drecreaseQty in redux.')
    }
  }
}
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return {...state, ...action.items}
    // case DELETE_ITEM:
    //   return state.items.filter(
    //     orderItem => orderItem.id !== action.orderItemId
    //   )
    case ADD_ITEM:
      return {...state, ...action.item}
    case SET_ORDER:
      return {...state, ...action.order}
    case INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return item.quantity++
          }
        })
      }
    case DECREMENT_ITEM:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return item.quantity--
          }
        })
      }
    default:
      return state
  }
}
//need to double check returned states...
