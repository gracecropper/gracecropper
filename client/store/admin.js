import axios from 'axios'

//Action Types
const GET_USERS = 'GET_USERS'

//Action creator
const getUsers = users => ({type: GET_USERS, users})

//Thunk Creator to get Users
export const fetchUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

//initialState
const initialState = {
  users: []
}

//reducer
export default function admin(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
