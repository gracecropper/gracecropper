const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: +req.params.id
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
