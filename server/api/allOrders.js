const router = require('express').Router()
const {User, Product, OrderItem, Order} = require('../db/models')

// GET /api/allorders/orderhistory

router.get('/orderhistory', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401)
      return
    }
    const orders = await req.user.getOrders({include: Product})
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
