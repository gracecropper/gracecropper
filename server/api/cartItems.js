const router = require('express').Router()
const {OrderItem, Order, Product} = require('../db/models')
module.exports = router

// POST REQUEST FOR CREATING NEW ORDER

//find or create bc user might have orderID already started...
router.post('/', async (req, res, next) => {
  try {
    let newItem
    let createdBoolean
    let checkUser = req.session.passport
    // //if user is signed in
    if (checkUser) {
      ;[newItem, createdBoolean] = await Order.findOrCreate({
        where: {
          userId: checkUser.user,
          status: req.body.status
        },
        include: Product
      })
    } else {
      //just make an Order! save OrderId to sessions later
      newItem = await Order.create(req.body)
    }

    //save orderId to req.session
    req.session.orderId = newItem.id

    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

//PUT REQUEST FOR CREATING NEW ORDER ITEM
router.put('/add', async (req, res, next) => {
  try {
    const {orderId, productId, quantity, price} = req.body

    //find the product and the order #
    const orderInstance = await Order.findByPk(orderId)
    const productInstance = await Product.findByPk(productId)

    //check to see if association exists already
    let orderItem = await OrderItem.findOne({
      where: {
        orderId: orderId,
        productId: productId
      }
    })

    if (orderItem) {
      orderItem.increment('quantity', {by: quantity})
    } else {
      orderItem = await orderInstance.addProduct(productInstance, {
        through: {quantity: quantity, price: price}
      })
    }

    //update the subtotal and total
    orderInstance.updateCartTotals(price, quantity)

    //return the order
    const result = await Order.findOne({
      where: {
        id: orderId
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
router.delete('/delete', async (req, res, next) => {
  try {
    const item = await OrderItem.findOne({
      where: {productId: req.query.item, orderId: req.query.cart}
    })

    if (!item) return res.sendStatus(404)

    //delete quantity and price from cart total
    const order = await Order.findByPk(req.query.cart)
    order.subtractTotal(item.price, item.quantity)

    await item.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// //PUT REQUEST FOR DECREMENTING ORDER ITEM QTY
router.put('/decrement', async (req, res, next) => {
  try {
    const item = await OrderItem.findOne({
      where: {productId: req.query.item, orderId: req.query.cart}
    })

    await item.decrement('quantity') //by default, decrements by 1

    //delete quantity and price from cart total
    const order = await Order.findByPk(req.query.cart)
    order.subtractTotal(item.price, 1) // decrements by 1

    res.json(item)
  } catch (error) {
    next(error)
  }
})

// //PUT REQUEST FOR INCREMENTING ORDER ITEM QTY
router.put('/increment', async (req, res, next) => {
  try {
    const item = await OrderItem.findOne({
      where: {productId: req.query.item, orderId: req.query.cart}
    })

    await item.increment('quantity') //by default, increments by 1

    //delete quantity and price from cart total
    const order = await Order.findByPk(req.query.cart)
    order.updateCartTotals(item.price, 1) //increase quantity by 1, not total quantity

    res.json(item)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const allItems = await Order.findAll({
      where: {
        id: req.params.orderId
      }
    })
    res.json(allItems)
  } catch (error) {
    next(error)
  }
})
