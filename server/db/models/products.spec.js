const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('requires a name', async () => {
    try {
      await Product.create({
        quantity: 10
      })
      throw Error('Creating this product should have failed')
    } catch (error) {
      console.log(error.message)
      expect(error.message).to.contain('product.name cannot be null')
    }
  })
})
