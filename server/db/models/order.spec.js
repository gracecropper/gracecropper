/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const Product = db.model('product')

describe('Order model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
  })

  it('quantity defaults to 0 if not provided', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    expect(order1.quantity).to.be.equal(0)
  })
  it('tax defaults to 1.0825 if not provided', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    expect(order1.tax).to.be.equal('1.0825')
  })
  it('orderSubtotal defaults to 0 if not provided', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    expect(order1.orderSubtotal).to.be.equal(0)
  })
  it('orderTotalDisplay equal to this.orderTotal / 100', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place',
      orderSubtotal: 100
    })
    expect(order1.orderTotalDisplay).to.be.equal('$1.08')
  })
  it('updateCartTotals to be a function', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place'
    })
    expect(order1.updateCartTotals).to.be.a(
      'function',
      'updateCartTotals isnt a function!'
    )
  })
  it('updateCartTotals to update the order total and quantity', async () => {
    let order1 = await Order.create({
      date: new Date(),
      status: 'Delivered',
      paymentMethod: 'credit',
      shippingAddress: '777 Park Place',
      orderSubtotal: 40,
      quantity: 1
    })

    order1.updateCartTotals(50, 2)

    expect(order1).to.be.an('object', 'Could not find orderUpdate!')
    expect(order1.orderSubtotal).to.deep.equal(
      140,
      'orderSubtotal is not properly updated'
    )
    expect(order1.quantity).to.deep.equal(3, 'quantity is not properly updated')
  })
})
