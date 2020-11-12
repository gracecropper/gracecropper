const router = require('express').Router()
const {User} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'Admin') {
      return res.sendStatus(401)
    }
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
