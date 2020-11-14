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

    //need to check if assoc. exists, if so, update, else add.
    //the through here adds the quantity and price to the OrderItem
    const orderItem = await orderInstance.addProduct(productInstance, {
      through: {quantity: quantity, price: price}
    })

    // if (createdBoolean === true) {
    //if new orderItem instance, update as new quantity

    // newItem.update({quantity: quantity, price: price})
    // } else {
    //   //If it already exists, just increment the current quantity
    //   newItem.increment('quantity', {by: quantity})
    // }

    // orderInstance.update()

    const result = await Order.findOne({
      where: {
        id: orderId
      },
      include: {
        model: Product
      }
    })

    // result.updateCart(orderItem) giving an error rn
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// //DELETE REQUEST
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const item = await OrderItem.findByPk(+req.params.id)
//     if (!item) return res.sendStatus(404)
//     await item.destroy()
//     res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// })

// //PUT REQUEST FOR DECREMENTING ORDER ITEM QTY
// router.put('/:id/decrement', async (req, res, next) => {
//   try {
//     //need to refactor this since we don't have pk in orderitems table.
//     const id = req.params.id
//     const orderItem = await OrderItem.findByPk(id)
//     await orderItem.decrement('quantity') //by default, decrements by 1
//     res.json(orderItem)
//     // res.status(204)
//   } catch (error) {
//     next(error)
//   }
// })

// //PUT REQUEST FOR INCREMENTING ORDER ITEM QTY

// router.put('/:id/increment', async (req, res, next) => {
//   try {
//     //need to refactor this since we don't have pk in orderitems table.
//     const id = req.params.id
//     const orderItem = await OrderItem.findByPk(id)
//     await orderItem.increment('quantity') //by default increments by 1
//     res.json(orderItem)
//     // res.status(204)
//   } catch (error) {
//     next(error)
//   }
// })

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
