/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
        role: 'Admin'
      })
    })

    it('returns true if the password is correct', () => {
      expect(cody.correctPassword('bones')).to.be.equal(true)
    })

    it('returns false if the password is incorrect', () => {
      expect(cody.correctPassword('bonez')).to.be.equal(false)
    })

    it('isAdmin returns true if the user is an admin', async () => {
      const codyInfo = await User.findOne({
        where: {email: 'cody@puppybook.com'}
      })

      const isAdminFunc = await User.isAdmin(codyInfo.dataValues.id)
      expect(isAdminFunc).to.be.equal(true)
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
