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

//delete product express route!
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(204)
  } catch (err) {
    next(err)
  }
})
