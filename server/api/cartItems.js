const router = require('express').Router()
const {OrderItem, Order, Product} = require('../db/models')
module.exports = router

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
    const {orderId, productId, quantity, price} = req.body
    const [newItem, createdBoolean] = await OrderItem.findOrCreate({
      where: {
        orderId: orderId,
        productId: productId
      }
    })
    if (createdBoolean === true) {
      //if new orderItem instance, update as new quantity
      newItem.update({quantity: quantity, price: price})
    } else {
      //If it already exists, just increment the current quantity
      newItem.increment('quantity', {by: quantity})
    }
    // OrderInstance.addToCart(orderitem) prototype method defined in db that adds to Order subTotal
    const orderInstance = await Order.findByPk(orderId)
    orderInstance.addToCart(newItem)

    //we now have to use findOne or findAll to eager load products table...
    //I can only fix the error msg: "EagerLoadingError [SequelizeEagerLoadingError]: product is not associated to orderItem!" by adding another association in the db...maybe there's a better way to do this.

    const result = await OrderItem.findOne({
      where: {
        orderId,
        productId
      },
      include: {
        model: Product
      }
    })
    res.json(result)
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
    //need to refactor this since we don't have pk in orderitems table.
    const id = req.params.id
    const orderItem = await OrderItem.findByPk(id)
    await orderItem.decrement('quantity') //by default, decrements by 1
    res.json(orderItem)
    // res.status(204)
  } catch (error) {
    next(error)
  }
})

//PUT REQUEST FOR INCREMENTING ORDER ITEM QTY

router.put('/:id/increment', async (req, res, next) => {
  try {
    //need to refactor this since we don't have pk in orderitems table.
    const id = req.params.id
    const orderItem = await OrderItem.findByPk(id)
    await orderItem.increment('quantity') //by default increments by 1
    res.json(orderItem)
    // res.status(204)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const allItems = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId
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
