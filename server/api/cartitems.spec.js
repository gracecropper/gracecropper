/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('cart items routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cartitems/:orderId', () => {
    beforeEach(() => {
      return Order.create({
        status: 'In User Cart',
        quantity: 150
      })
    })
    it('GET /api/cartitems/1', async () => {
      const res = await request(app)
        .get('/api/cartitems/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.quantity).to.be.equal(150)
    })
  })
})
