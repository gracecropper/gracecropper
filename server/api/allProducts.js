const router = require('express').Router()
const {Product} = require('../db/models')

// What is the difference between AllProducts vs. SingleProduct routers?

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

// who should we restrict this route to? should any user be able to create new products?

//route to add products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router
