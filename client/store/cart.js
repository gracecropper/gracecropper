import axios from 'axios'
/**
 * ACTION TYPES
 */
const SET_ITEMS = 'SET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const POST_ITEM = 'POST_ITEM'
const SET_ORDERID = 'SET_ORDERID'
const INCREMENT_ITEM = 'INCREMENT_ITEM'
const DECREMENT_ITEM = 'DECREMENT_ITEM'
/**
 * INITIAL STATE
 */
const initialState = {
  orderId: null,
  items: []
}

/**
 * ACTION CREATORS
 */
const setItems = items => ({
  type: SET_ITEMS,
  items
})

const deleteItem = orderItemId => ({
  type: DELETE_ITEM,
  orderItemId
})

const postItem = item => ({
  type: POST_ITEM,
  item
})
const setOrderId = id => ({
  type: SET_ORDERID,
  id
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
      console.log('there was an error in deleteOrderItem in redux')
    }
  }
}

//i need to add this to combine reducers.
export const orderCreator = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cartItems', {
        status: 'In User Cart'
      })
      dispatch(setOrderId(data.id))
    } catch (error) {
      console.log('there was an error in orderCreator', error)
    }
  }
}
export const addToCart = (productsObj, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cartItems/add', {
        quantity: productsObj.quantity,
        price: productsObj.price,
        orderId: orderId,
        productId: productsObj.id
      })
      dispatch(postItem(data))
    } catch (error) {
      console.log('there was an error in addToCart in redux')
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
      return {...state, items: action.items}
    case DELETE_ITEM:
      return state.items.filter(
        orderItem => orderItem.id !== action.orderItemId
      )
    case POST_ITEM:
      return {...state, items: [...state.items, action.item]}
    case SET_ORDERID:
      return {...state, orderId: action.id}
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
