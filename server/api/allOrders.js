const router = require('express').Router()
const {User, Product, OrderItem, Order} = require('../db/models')

// GET /api/allorders/myHistory

router.get('/myHistory', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401)
      return
    }
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.user.id
          }
        },
        {
          model: OrderItem,
          include: {
            model: Product
          }
        }
      ]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router