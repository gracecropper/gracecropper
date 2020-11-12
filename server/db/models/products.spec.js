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
      // console.log(error.message)
      expect(error.message).to.contain('product.name cannot be null')
    }
  })
  it('has a default image', async () => {
    const corn = await Product.create({name: 'corn', type: 'Crops'})
    expect(corn.imageUrl).to.be.equal('/img/cornPic.jpg')
  })
  it('name cannot be empty', async () => {
    try {
      await Product.create({type: 'Crops', name: ''})
      throw Error('Creating this product should have failed')
    } catch (error) {
      // console.log(error.message)
      expect(error.message).to.contain('Validation notEmpty on name failed')
    }
  })
})
