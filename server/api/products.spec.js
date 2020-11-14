// NEEDS TO UPDATE THE FILE ONCE DB CREATED

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    //
    beforeEach(() => {
      return Product.create({
        //
        name: 'Crops',
        type: 'Crops'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
