const router = require('express').Router()
const {User, Product, OrderItem, Order} = require('../db/models')

// GET /api/allorders/orderhistory

router.get('/orderhistory/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401)
      return
    }
    const user = await User.findByPk(req.params.id)
    const orders = await user.getOrders({include: Product})

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
