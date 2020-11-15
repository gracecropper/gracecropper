/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const OrderItem = db.model('orderItem')

describe('cartitems routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cartitems/', () => {
    beforeEach(() => {
      return OrderItem.create({
        quantity: 1,
        price: 2500,
        productId: 1,
        orderId: 1
      })
    })

    it('GET /api/cartitems', async () => {
      const res = await request(app)
        .get('/api/cartitems')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(1)
    })
  })
})
