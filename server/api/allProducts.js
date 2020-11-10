const router = require('express').Router()
const { Products } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Products.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
