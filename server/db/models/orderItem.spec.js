/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const Product = db.model('product')

describe('orderItem model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  it('addProduct to be a function', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    expect(order1.addProduct).to.be.a('function', 'addProduct isnt a function!')
  })
  it('addProduct to associate order with product', async () => {
    let product1 = await Product.create({
      type: 'Cropped Tops',
      name: 'Cropped Shirt',
      price: 100,
      quantity: 10
    })
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    let orderItem2 = await order1.addProduct(product1, {
      through: {quantity: 1, price: 100}
    })

    expect(orderItem2).to.be.an('array', 'Could not find orderItem2!')
    expect(orderItem2[0].orderId).to.deep.equal(
      order1.id,
      'order is not properly linked'
    )
    expect(orderItem2[0].productId).to.deep.equal(
      product1.id,
      'product is not properly linked'
    )
  })
})
