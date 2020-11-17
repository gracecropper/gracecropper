import {expect} from 'chai'
import store from '.'
import {setProducts, writeProducts} from './allProducts'
describe('all products redux', () => {
  it('returns initial state by default', () => {
    const initialState = store.getState()
    store.dispatch({type: ''})
    expect(store.getState()).to.equal(initialState)
  })
  it('SET_PRODUCTS sets products', () => {
    const products = [{name: 'crops'}]
    store.dispatch(setProducts(products))
    expect(store.getState().allProducts.products).to.equal(products)
    expect(store.getState().allProducts.loading).to.equal(false)
  })
  it('WRITE_PRODUCT writes a product', () => {
    const newProduct = {
      name: 'Blue Crop Top',
      type: 'Winter Collection',
      quantity: 7
    }
    store.dispatch(writeProducts(newProduct))
    expect(store.getState().allProducts.newProduct.name).to.equal(
      'Blue Crop Top'
    )
    expect(store.getState().allProducts.newProduct.type).to.equal(
      'Winter Collection'
    )
    expect(store.getState().allProducts.newProduct.quantity).to.equal(7)
  })
})
