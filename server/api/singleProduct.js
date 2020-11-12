const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// consider changing to findByPk?
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
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

// What if we destructured on line 38?

//edit product route
router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProductPromise = await Product.update(req.body, {
      returning: true,
      where: {
        id: req.params.productId
      }
    })

    const [numOfAffectedRows, [updatedProduct]] = updatedProductPromise

    res.status(200).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})
