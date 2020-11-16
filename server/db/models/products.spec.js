const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    await Product.create({
      type: 'Cropped Tops',
      name: 'Cropped Shirt',
      price: 100,
      quantity: 10
    })
  })

  it('requires a name', async () => {
    try {
      await Product.create({
        quantity: 10
      })
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain('product.name cannot be null')
    }
  })

  it('has a default image', async () => {
    const corn = await Product.create({
      name: 'corn',
      type: 'Crops',
      quantity: 10,
      price: 1000
    })
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

  it('quantity cannot be null', async () => {
    try {
      await Product.create({type: 'Crops', name: 'Crops'})
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain(
        'notNull Violation: product.quantity cannot be null'
      )
    }
  })

  it('quantity cannot be greater than 10000', async () => {
    try {
      await Product.create({type: 'Crops', name: 'Crops', quantity: 50000})
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain(
        'Validation error: Validation max on quantity failed'
      )
    }
  })

  it('quantity cannot be less than 0', async () => {
    try {
      await Product.create({type: 'Crops', name: 'Crops', quantity: -1})
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain(
        'Validation error: Validation min on quantity failed'
      )
    }
  })

  it('price cannot be less than 0', async () => {
    try {
      await Product.create({
        type: 'Crops',
        name: 'Crops',
        price: -1,
        quantity: 10
      })
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain(
        'Validation error: Validation min on price failed'
      )
    }
  })

  it('price cannot be null', async () => {
    try {
      await Product.create({type: 'Crops', name: 'Crops', quantity: 10})
      throw Error('Creating this product should have failed')
    } catch (error) {
      expect(error.message).to.contain(
        'notNull Violation: product.price cannot be null'
      )
    }
  })

  it('turns the price into pennies before creation', async () => {
    const product = await Product.create({
      type: 'Crops',
      name: 'Crops',
      quantity: 10,
      price: 100
    })

    expect(product.price).to.be.equal(10000)
  })

  it('turns the price into pennies before update', async () => {
    const [numOfAffectedRows, updatedProductPromise] = await Product.update(
      {price: 600},
      {
        returning: true,
        where: {
          id: 1
        }
      }
    )
    expect(numOfAffectedRows).to.deep.equal(1)
    expect(updatedProductPromise[0].dataValues.price).to.deep.equal(60000)
  })
})
