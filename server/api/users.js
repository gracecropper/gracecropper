const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'role']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401)
    }
    if (!req.user.correctPassword(req.body.oldPassword)) {
      return res.sendStatus(401)
    }
    const userToUpdate = await User.findByPk(req.body.userId)
    if (req.user.role === 'Admin') {
      await userToUpdate.update({
        role: req.body.role
      })
    }
    if (req.body.userId === req.user.id) {
      if (req.body.email) {
        userToUpdate.email = req.body.email
      }
      if (req.body.password) {
        userToUpdate.password = req.body.password
      }
      await userToUpdate.save()
    }
    res.send(userToUpdate)
  } catch (err) {
    next(err)
  }
})
