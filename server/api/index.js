const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/cartitems', require('./cartItems'))
// router.use('/cartOrder', require('./cartOrder'))
router.use('/products', require('./products'))
router.use('/allorders', require('./allOrders'))
router.use('/upload', require('./upload'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
