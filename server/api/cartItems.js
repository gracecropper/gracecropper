const router = require('express').Router()
const {OrderItem, Order, Product} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  try {
    const allItems = await OrderItem.findAll({
      where: {
        orderId: +req.params.orderId
      },
      include: {
        model: Product
      }
    })
    res.json(allItems)
  } catch (error) {
    next(error)
  }
})

// POST REQUEST FOR CREATING NEW ORDER
router.post('/', async (req, res, next) => {
  try {
    const newItem = await Order.create(req.body)
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

//POST REQUEST FOR CREATING NEW ORDER ITEM
router.post('/add', async (req, res, next) => {
  try {
    const newItem = await OrderItem.create(req.body)
    const orderId = req.body.orderId
    const orderInstance = await Order.findByPk(orderId)
    orderInstance.addToCart(newItem)
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

//DELETE REQUEST
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(+req.params.id)
    if (!item) return res.sendStatus(404)
    await item.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//PUT REQUEST FOR DECREMENTING ORDER ITEM QTY
router.put('/:id/decrement', async (req, res, next) => {
  try {
    const id = req.params.id
    const orderItem = await OrderItem.findByPk(id)
    await orderItem.update() //find out how to change the db
    res.status(204)
  } catch (error) {
    next(error)
  }
})

//PUT REQUEST FOR INCREMENTING ORDER ITEM QTY

router.put('/:id/increment', async (req, res, next) => {
  try {
    const id = req.params.id
    const orderItem = await OrderItem.findByPk(id)
    await orderItem.update() //find out how to change the db
    res.status(204)
  } catch (error) {
    next(error)
  }
})
