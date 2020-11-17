/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  orderCreator,
  deleteItem,
  getAllCartItems,
  addToCart,
  increaseQuant,
  decreaseQuant,
  removeCart
} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart', () => {
  let store
  let mockAxios

  const initialState = {
    orderTotal: 2706,
    status: 'In User Cart',
    quantity: 1,
    orderSubtotal: 2500,
    products: [
      {
        name: 'fakeproduct',
        id: 1,
        quantity: 10,
        price: 1000,
        orderItem: {quantity: 1, price: 1000, orderId: 1, productId: 1}
      },
      {
        name: 'fakeproduct2',
        id: 2,
        quantity: 10,
        price: 1000,
        orderItem: {quantity: 2, price: 2000, orderId: 1, productId: 2}
      }
    ]
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('orderCreator', () => {
    it('Gets the order', async () => {
      const fakeOrder = {status: 'In User Cart'}

      mockAxios.onPost('/api/cartItems').replyOnce(200, fakeOrder)
      await store.dispatch(orderCreator())
      const actions = store.getActions()

      expect(actions[0].type).to.be.equal('SET_ORDER')
      expect(actions[0].order).to.be.deep.equal({status: 'In User Cart'})
    })
  })

  describe('getAllCartItems', () => {
    it('Gets Users Cart Items', async () => {
      mockAxios.onGet('/api/cartitems/1').reply(200, initialState)

      await store.dispatch(getAllCartItems(1))
      const actions = store.getActions()

      expect(actions[0].type).to.be.equal('SET_ITEMS')
      expect(actions[0].items).to.deep.equal(initialState)
    })
  })

  describe('deleteOrderItem', () => {
    it('Returns delete item as an action', () => {
      expect(deleteItem(1)).to.deep.equal({
        type: 'DELETE_ITEM',
        productId: 1
      })
    })
  })

  describe('increase and decrease Quant', () => {
    it('Returns increase Quant as an action', () => {
      expect(increaseQuant(1, 1)).to.deep.equal({
        type: 'INCREMENT_ITEM',
        id: 1
      })
    })

    it('Returns decrease Quant as an action', () => {
      expect(decreaseQuant(1, 1)).to.deep.equal({
        type: 'DECREMENT_ITEM',
        id: 1
      })
    })
  }) //end delete Order Item

  describe('Add to Cart', () => {
    it('Adds an item to the cart', async () => {
      const fakeOrderItem = {
        productId: 5,
        orderId: 3,
        price: 2500,
        quantity: 10
      }

      mockAxios.onPut('/api/cartItems/add').reply(204, fakeOrderItem)

      await store.dispatch(addToCart(fakeOrderItem, 1))
      const actions = store.getActions()

      expect(actions[0].type).to.be.equal('ADD_ITEM')
      expect(actions[0].item).to.deep.equal(fakeOrderItem)
    })
  })

  describe('Delete Cart', () => {
    it('Deletes the entire cart', () => {
      expect(removeCart()).to.deep.equal({
        type: 'REMOVE_CART'
      })
    })
  })
})
