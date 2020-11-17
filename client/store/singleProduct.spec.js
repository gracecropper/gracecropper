import {expect} from 'chai'
import store from '.'
import {getProduct, updateSingleProduct} from './singleProduct'

describe('single product redux', () => {
  it('returns initial state by default', () => {
    const initialState = store.getState()
    store.dispatch({type: ''})
    expect(store.getState()).to.equal(initialState)
  })
  it('GET_PRODUCT gets product', () => {
    const product = {name: 'crops'}
    store.dispatch(getProduct(product))
    expect(store.getState().singleProduct.singleProduct).to.be.deep.equal(
      product
    )
  })
  it('UPDATE_PRODUCT updates a product', () => {
    const newProduct = {
      name: 'Blue Crop Top'
    }
    store.dispatch(updateSingleProduct(newProduct))
    expect(store.getState().singleProduct.singleProduct.name).to.equal(
      'Blue Crop Top'
    )
  })
})
