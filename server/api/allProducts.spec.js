// NEEDS TO UPDATE THE FILE ONCE DB CREATED

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('products')

describe('All products routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/allproducts', () => {
    //
    beforeEach(() => {
      return Product.create({
        //
      })
    })

    it('GET /api/allproducts', async () => {
      const res = await request(app)
        .get('/api/allproducts')
        .expect(200)

      expect(res.body).to.be.an('array')
      // expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
