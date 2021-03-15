const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const agent = require('supertest')(app)
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    //
    const products = [
      {
        name: 'Crops',
        type: 'Crops',
        quantity: 20,
        price: 1000
      }
    ]
    beforeEach(async () => {
      await Promise.all(
        products.map(val => {
          return Product.create(val)
        })
      )
    })

    it('GET /api/products responds with all products', async () => {
      const res = await agent.get('/api/products').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.equal('Crops')
    }) // end describe('/api/users')
  }) // end describe('User routes')
})
