'use strict'
/* global describe it */

const seed = require('./seed')
const {Product} = require('../server/db/models')

describe('seed script', () => {
  beforeEach(seed)
  it('creates at least 3 products', async () => {
    const products = await Product.findAll()
    expect(products).to.have.lengthOf.at.least(3)
  })
})
