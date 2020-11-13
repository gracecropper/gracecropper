import Axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const setOrders = orders => ({type: SET_ORDERS, orders})

export const getMyHistory = () => async dispatch => {
  try {
    const {data} = await Axios.get('/api/allorders/myHistory')
    dispatch(setOrders(data))
  } catch (error) {
    console.error(error)
  }
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default ordersReducer
